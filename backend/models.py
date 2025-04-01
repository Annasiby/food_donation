"""from app import app, db
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Hashed password
    address = db.Column(db.String(255))
    user_type = db.Column(db.String(10), nullable=False)  # "donor" or "receiver"
    
    donations = db.relationship('Donation', backref='donor', lazy=True)
    requests = db.relationship('Request', backref='receiver', lazy=True)

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_details = db.Column(db.Text, nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default="pending")
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    food_needed = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="pending")
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

# Creating tables inside app context
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")"""
from backend import db, login_manager  # Add login_manager import here
from flask_login import UserMixin
from sqlalchemy.sql import func

# Add this right after your imports, before the class definitions
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    
    donations = db.relationship('Donation', back_populates='donor')
    requests = db.relationship('Request', back_populates='requester')

class Donation(db.Model):
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    food_item = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), server_default='Pending')
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    donor = db.relationship('User', back_populates='donations')

class Request(db.Model):
    __tablename__ = 'requests'
    
    id = db.Column(db.Integer, primary_key=True)
    requested_item = db.Column(db.String(100), nullable=False)
    quantity_needed = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), server_default='Pending')
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    requester = db.relationship('User', back_populates='requests')