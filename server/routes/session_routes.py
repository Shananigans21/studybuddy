from flask import Blueprint, request, jsonify
from models import StudySession
from extensions import db
from datetime import datetime

session_bp = Blueprint('sessions', __name__)

# Get all study sessions
@session_bp.route('/sessions', methods=['GET'])
def get_sessions():
    sessions = StudySession.query.all()
    return jsonify([s.to_dict() for s in sessions]), 200

# Get a specific study session by ID
@session_bp.route('/sessions/<int:id>', methods=['GET'])
def get_session(id):
    session = StudySession.query.get_or_404(id)
    return jsonify(session.to_dict()), 200

# Update a specific study session by ID
@session_bp.route('/sessions/<int:id>', methods=['PATCH'])
def update_session(id):
    session = StudySession.query.get_or_404(id)
    data = request.get_json()
    session.subject = data.get("subject", session.subject)
    session.topic = data.get("topic", session.topic)
    session.duration_minutes = data.get("duration_minutes", session.duration_minutes)
    
    # Optional: update date if provided
    if "date" in data:
        try:
            session.date = datetime.fromisoformat(data["date"])
        except ValueError:
            return {"error": "Invalid date format. Use ISO 8601 format."}, 400

    try:
        db.session.commit()
        return session.to_dict(), 200
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

# Delete a specific study session by ID
@session_bp.route('/sessions/<int:id>', methods=['DELETE'])
def delete_session(id):
    session = StudySession.query.get(id)
    if not session:
        return {"error": "Study session not found"}, 404

    try:
        db.session.delete(session)
        db.session.commit()
        return {"message": "Study session deleted"}, 200
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

# Create a new study session
@session_bp.route('/sessions', methods=['POST'])
def create_session():
    data = request.get_json()
    subject = data.get("subject")
    topic = data.get("topic")
    duration_minutes = data.get("duration_minutes")
    date_str = data.get("date")  # Optional

    if not subject or not topic or not duration_minutes:
        return {"error": "Subject, topic, and duration are required."}, 400

    try:
        date = datetime.fromisoformat(date_str) if date_str else datetime.utcnow()
    except ValueError:
        return {"error": "Invalid date format. Use ISO 8601 format."}, 400

    new_session = StudySession(
        subject=subject,
        topic=topic,
        duration_minutes=duration_minutes,
        date=date
    )

    try:
        db.session.add(new_session)
        db.session.commit()
        return new_session.to_dict(), 201
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500
