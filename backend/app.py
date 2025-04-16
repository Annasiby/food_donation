
"""
from flask import Flask, render_template
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_required

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
migrate = Migrate()
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

def create_app():
    app = Flask(__name__, template_folder='backend/templates')

    # Database & Security Configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = '20d0296bcfab2f477587a66772651a71'  # Change this to a real secret key

    # Initialize extensions with app
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    migrate.init_app(app, db)

    # Import and register blueprints
    from backend.routes.auth_routes import bp as auth_bp
    from backend.routes.donation_routes import bp as donation_bp
    from backend.routes.request_routes import bp as request_bp
    from backend.routes.main_routes import main_bp  # Ensure this file exists

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donation_bp, url_prefix='/donation')
    app.register_blueprint(request_bp, url_prefix='/request')
    app.register_blueprint(main_bp)  # No prefix, so '/dashboard' works globally

    # Default route
    @app.route('/')
    def home():
        return "Welcome to the Food Donation App!"

    return app

# Run the app
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
"""

# from flask import Flask
# from backend.config import Config
# from backend import db, bcrypt, login_manager, migrate

# def create_app():
#     # Initialize Flask app with proper template folder
#     app = Flask(__name__, template_folder='templates')
    
#     # Load configuration
#     app.config.from_object(Config)

#     # Initialize extensions with the app
#     db.init_app(app)
#     bcrypt.init_app(app)
#     login_manager.init_app(app)
#     migrate.init_app(app, db)
#         # Import models after db initialization
#     from backend.models import User, Donation, Request  # noqa

#     # Import blueprints here to avoid circular imports
#     from backend.routes.auth_routes import auth_bp
#     from backend.routes.donation_routes import donation_bp
#     from backend.routes.request_routes import request_bp
#     from backend.routes.main_routes import main_bp

#     # Register blueprints with URL prefixes
#     app.register_blueprint(auth_bp, url_prefix='/auth')
#     app.register_blueprint(donation_bp, url_prefix='/donations')
#     app.register_blueprint(request_bp, url_prefix='/requests')
#     app.register_blueprint(main_bp)  # No prefix for main routes

#     # Simple test route
#     @app.route('/healthcheck')
#     def healthcheck():
#         return "Server is running", 200

#     return app

# # Create app instance
# app = create_app()

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from datetime import datetime
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Config
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'food_donation.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Ensure instance directory exists
os.makedirs(os.path.join(basedir, 'instance'), exist_ok=True)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    food_item = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    expiry_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='available')

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({
        "message": "Food Donation API is running",
        "endpoints": {
            "register": "POST /api/register",
            "login": "POST /api/login"
        }
    })

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Registration Request Data:", data)

    required = ['name', 'email', 'password', 'confirmPassword']
    if not all(field in data for field in required):
        return jsonify({'error': 'All fields are required'}), 400

    if data['password'] != data['confirmPassword']:
        return jsonify({'error': 'Passwords do not match'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400

    try:
        new_user = User(
            name=data['name'],
            email=data['email'],
            password=generate_password_hash(data['password'])
        )
        db.session.add(new_user)
        db.session.commit()
        print(f"User '{new_user.email}' registered successfully.")
        return jsonify({'message': 'Registration successful'}), 201
    except Exception as e:
        db.session.rollback()
        print("Registration error:", e)
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Login Request Data:", data)

    if not all(field in data for field in ['email', 'password']):
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 200

@app.route('/api/donations', methods=['POST'])
@jwt_required()
def create_donation():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    print(f"Donation request from user {current_user_id}: {data}")

    required_fields = ['foodItem', 'quantity', 'location', 'userId']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_donation = Donation(
            user_id=data['userId'],
            food_item=data['foodItem'],
            quantity=int(data['quantity']),
            location=data['location'],
            expiry_date=datetime.strptime(data['expiryDate'], '%Y-%m-%d') if data.get('expiryDate') else None,
            description=data.get('description', '')
        )

        db.session.add(new_donation)
        db.session.commit()

        return jsonify({
            "message": "Donation created successfully",
            "donation": {
                "id": new_donation.id,
                "foodItem": new_donation.food_item,
                "status": new_donation.status
            }
        }), 201
    except ValueError as e:
        print("Value error:", e)
        return jsonify({"error": "Invalid data format"}), 400
    except Exception as e:
        db.session.rollback()
        print("Donation error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
