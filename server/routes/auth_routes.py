from flask import Blueprint, request, session
from extensions import db, bcrypt
from models import User

auth_bp = Blueprint("auth", __name__)

# Handle OPTIONS preflight requests
@auth_bp.before_request
def handle_options():
    if request.method == "OPTIONS":
        return "", 200

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {"error": "All fields are required."}, 400

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return {"error": "User already exists."}, 409

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(username=username, email=email, password_hash=hashed_pw)

    db.session.add(new_user)
    db.session.commit()

    return {"message": "User created successfully."}, 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error": "Email and password are required."}, 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        session["user_id"] = user.id
        return {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }, 200
    else:
        return {"error": "Invalid credentials"}, 401
