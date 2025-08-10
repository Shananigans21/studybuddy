from flask import Flask
from flask_cors import CORS
from extensions import db, migrate, bcrypt
from routes.auth_routes import auth_bp
from routes.reflection_routes import reflection_bp   # <- import here

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Allow frontend origin and support cookies (credentials)
    CORS(app, origins=["http://localhost:4000"], supports_credentials=True)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(reflection_bp)  # <- register here

    @app.route('/')
    def home():
        return {"message": "Welcome to StudyBuddy API"}, 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
