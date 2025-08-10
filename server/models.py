# models.py
from datetime import datetime
from extensions import db

class Reflection(db.Model):
    __tablename__ = "reflections"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    session_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.Text, nullable=False)
    mood_rating = db.Column(db.Integer, nullable=False)
    ai_generated = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "session_id": self.session_id,
            "text": self.text,
            "mood_rating": self.mood_rating,
            "ai_generated": self.ai_generated,
            "created_at": self.created_at.isoformat()
        }
