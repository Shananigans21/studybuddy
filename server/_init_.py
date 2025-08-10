from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, migrate, bcrypt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    CORS(app)

    # Import and register blueprints here
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    from routes.session_routes import session_bp
    app.register_blueprint(session_bp)

    from routes.user_session_routes import user_session_bp
    app.register_blueprint(user_session_bp)

    from routes.reflection_routes import reflection_bp
    app.register_blueprint(reflection_bp)

    @app.route('/')
    def home():
        return {"message": "Welcome to StudyBuddy API"}, 200

    return app
