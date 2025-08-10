from flask import Flask
from flask_cors import CORS
from extensions import db, migrate, bcrypt
from routes.auth_routes import auth_bp
from routes.session_routes import session_bp
from routes.user_session_routes import user_session_bp
from routes.reflection_routes import reflection_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # CORS setup - allow React localhost, support credentials, allow OPTIONS method
    CORS(
        app,
        origins=["http://localhost:4000"],
        supports_credentials=True,
        methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    )

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(session_bp)
    app.register_blueprint(user_session_bp)
    app.register_blueprint(reflection_bp)

    @app.route("/")
    def home():
        return {"message": "Welcome to StudyBuddy API"}, 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
