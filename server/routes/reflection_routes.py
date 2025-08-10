# routes/reflection_routes.py
from flask import Blueprint, request, jsonify
import traceback
from models import Reflection
from extensions import db

reflection_bp = Blueprint("reflections_bp", __name__)

# GET all reflections
@reflection_bp.route("/reflections", methods=["GET"])
def get_reflections():
    try:
        reflections = Reflection.query.all()
        return jsonify([r.to_dict() for r in reflections]), 200
    except Exception as e:
        print("Error fetching reflections:", e)
        traceback.print_exc()
        return jsonify({"error": "Internal Server Error"}), 500

# POST create a new reflection
@reflection_bp.route("/reflections", methods=["POST"])
def create_reflection():
    data = request.get_json() or {}

    required_fields = ["user_id", "session_id", "text", "mood_rating"]
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    try:
        new_reflection = Reflection(
            user_id=data["user_id"],
            session_id=data["session_id"],
            text=data["text"],
            mood_rating=data["mood_rating"],
            ai_generated=data.get("ai_generated", False)
        )
        db.session.add(new_reflection)
        db.session.commit()

        return jsonify(new_reflection.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print("Error creating reflection:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to create reflection"}), 500

# DELETE a reflection
@reflection_bp.route("/reflections/<int:id>", methods=["DELETE"])
def delete_reflection(id):
    try:
        reflection = Reflection.query.get(id)
        if not reflection:
            return jsonify({"error": "Reflection not found"}), 404

        db.session.delete(reflection)
        db.session.commit()
        return jsonify({"message": "Reflection deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        print("Error deleting reflection:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to delete reflection"}), 500
