from food_donation.app import app, db
from flask_login import UserMixin
from datetime import datetime

# User Model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    user_type = db.Column(db.String(10), nullable=False)  # "restaurant" or "charity"

# Food Donation Model
class FoodDonation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    food_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    expiry_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default="available")  # available, claimed, expired
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
