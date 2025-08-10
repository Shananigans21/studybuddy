from flask import Blueprint, request, jsonify
from models import Invitation, User, StudySession
from database import db

invite_bp = Blueprint("invites", __name__)

@invite_bp.route('/sessions/<int:session_id>/invite', methods=['POST'])
def invite_user(session_id):
    data = request.get_json()
    invitee_id = data.get('invitee_user_id')
    inviter_id = data.get('inviter_user_id')

    if not invitee_id or not inviter_id:
        return jsonify({"error": "Missing inviter_user_id or invitee_user_id"}), 400

    session = StudySession.query.get(session_id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    inviter = User.query.get(inviter_id)
    if not inviter:
        return jsonify({"error": "Inviter user not found"}), 404

    invitee = User.query.get(invitee_id)
    if not invitee:
        return jsonify({"error": "Invitee user not found"}), 404

    existing_invite = Invitation.query.filter_by(
        session_id=session_id, invitee_user_id=invitee_id
    ).first()
    if existing_invite:
        return jsonify({"error": "User already invited to this session"}), 400

    try:
        new_invite = Invitation(
            session_id=session_id,
            inviter_user_id=inviter_id,
            invitee_user_id=invitee_id,
        )
        db.session.add(new_invite)
        db.session.commit()
        return jsonify(new_invite.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@invite_bp.route('/sessions/<int:session_id>/invites', methods=['GET'])
def get_session_invites(session_id):
    session = StudySession.query.get(session_id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    invites = Invitation.query.filter_by(session_id=session_id).all()
    return jsonify([invite.to_dict() for invite in invites]), 200

@invite_bp.route('/users/<int:user_id>/invites', methods=['GET'])
def get_user_invites(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    invites = Invitation.query.filter_by(invitee_user_id=user_id).all()
    return jsonify([invite.to_dict() for invite in invites]), 200

@invite_bp.route('/invites/<int:invite_id>', methods=['PATCH'])
def update_invite_status(invite_id):
    invite = Invitation.query.get(invite_id)
    if not invite:
        return jsonify({"error": "Invitation not found"}), 404

    data = request.get_json()
    status = data.get("status")  # expected: 'accepted' or 'declined'

    if status not in ["accepted", "declined"]:
        return jsonify({"error": "Invalid status, must be 'accepted' or 'declined'"}), 400

    try:
        invite.status = status
        db.session.commit()
        return jsonify(invite.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
