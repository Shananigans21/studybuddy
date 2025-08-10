from flask import Blueprint, request, jsonify
from models import db, Session
from flask_cors import cross_origin

# Create the Blueprint
session_bp = Blueprint('sessions', __name__)

# GET all sessions
@session_bp.route('/sessions', methods=['GET'])
@cross_origin()
def get_sessions():
    sessions = Session.query.all()
    return jsonify([session.to_dict() for session in sessions]), 200

# GET a single session by ID
@session_bp.route('/sessions/<int:id>', methods=['GET'])
@cross_origin()
def get_session(id):
    session = Session.query.get(id)
    if not session:
        return jsonify({"error": "Session not found"}), 404
    return jsonify(session.to_dict()), 200

# CREATE a new session
@session_bp.route('/sessions', methods=['POST'])
@cross_origin()
def create_session():
    data = request.get_json()
    if not data.get('title') or not data.get('date'):
        return jsonify({"error": "Title and date are required"}), 400

    new_session = Session(
        title=data['title'],
        date=data['date'],
        description=data.get('description', '')
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify(new_session.to_dict()), 201

# UPDATE a session
@session_bp.route('/sessions/<int:id>', methods=['PATCH'])
@cross_origin()
def update_session(id):
    session = Session.query.get(id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    data = request.get_json()
    if 'title' in data:
        session.title = data['title']
    if 'date' in data:
        session.date = data['date']
    if 'description' in data:
        session.description = data['description']

    db.session.commit()
    return jsonify(session.to_dict()), 200

# DELETE a session
@session_bp.route('/sessions/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_session(id):
    session = Session.query.get(id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    db.session.delete(session)
    db.session.commit()
    return jsonify({"message": "Session deleted"}), 200
