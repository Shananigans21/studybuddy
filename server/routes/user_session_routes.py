from flask import Blueprint, request, jsonify
from models import UserStudySession
from extensions import db  
from datetime import datetime

user_session_bp = Blueprint("user_sessions", __name__)

@user_session_bp.route("/user_sessions", methods=["POST"])
def create_user_session():
    data = request.get_json()

    required_fields = ["user_id", "session_id", "start_time", "duration"]
    missing = [field for field in required_fields if field not in data]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    try:
        start_time = datetime.fromisoformat(data["start_time"])
    except ValueError:
        return jsonify({"error": "Invalid datetime format for start_time. Use ISO format."}), 400

    try:
        new_session = UserStudySession(
            user_id=data["user_id"],
            session_id=data["session_id"],
            start_time=start_time,
            duration=data["duration"],
            notes=data.get("notes")
        )
        db.session.add(new_session)
        db.session.commit()
        return new_session.to_dict(), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@user_session_bp.route("/user_sessions", methods=["GET"])
def get_user_sessions():
    sessions = UserStudySession.query.all()
    return jsonify([s.to_dict() for s in sessions]), 200

@user_session_bp.route("/user_sessions/<int:id>", methods=["DELETE"])
def delete_user_session(id):
    session = UserStudySession.query.get(id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    try:
        db.session.delete(session)
        db.session.commit()
        return jsonify({"message": "User study session deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
