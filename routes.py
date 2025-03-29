from flask import Flask, request, jsonify
from app import app, db
from models import User, FoodDonation
from flask_bcrypt import Bcrypt
from flask_cors import CORS

bcrypt = Bcrypt(app)
CORS(app)

# Register API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, user_type=data['user_type'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

# Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful!", "user": {"id": user.id, "username": user.username}})
    return jsonify({"message": "Invalid credentials"}), 401

# Post Food Donation
@app.route('/donate', methods=['POST'])
def donate():
    data = request.json
    new_donation = FoodDonation(
        restaurant_id=data['restaurant_id'], food_name=data['food_name'],
        quantity=data['quantity'], expiry_time=data['expiry_time']
    )
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({"message": "Food donation posted successfully!"})

# View Available Donations
@app.route('/donations', methods=['GET'])
def get_donations():
    donations = FoodDonation.query.filter_by(status="available").all()
    result = [{"id": d.id, "food_name": d.food_name, "quantity": d.quantity, "expiry_time": d.expiry_time} for d in donations]
    return jsonify(result)
