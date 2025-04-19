

# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
# from datetime import datetime, timedelta
# import os

# app = Flask(__name__)
# CORS(app, supports_credentials=True)

# # Config
# basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'food_donation.db')}"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JWT_SECRET_KEY'] = '20d0296bcfab2f477587a66772651a71'  # Change this in production
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)
# jwt = JWTManager(app)

# # Models
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)
#     phone = db.Column(db.String(20))

# class Donation(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     food_item = db.Column(db.String(100), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)
#     location = db.Column(db.String(200), nullable=False)
#     phone = db.Column(db.String(20))
#     expiry_date = db.Column(db.DateTime)
#     description = db.Column(db.Text)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     status = db.Column(db.String(20), default='available')
# # In your Flask app.py, add this right before app.run()


# @app.route('/')
# def home():
#     return jsonify({
#         "status": "running",
#         "message": "Food Donation API",
#         "endpoints": {
#             "register": "POST /api/register",
#             "login": "POST /api/login",
#             "create_donation": "POST /api/donations (auth required)"
#         }
#     }), 200
# @app.route('/api/users', methods=['GET'])
# def get_users():
#     try:
#         users = User.query.all()
#         users_data = [{
#             'id': user.id,
#             'name': user.name,
#             'email': user.email,
#             'phone': user.phone,
#             'created_at': user.created_at.isoformat() if hasattr(user, 'created_at') else None
#         } for user in users]
#         return jsonify(users_data), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
# @app.route('/api/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     print("Received registration data:", data)
    
#     required = ['name', 'email', 'password', 'phone']
#     if not all(field in data for field in required):
#         return jsonify({'error': 'Missing required fields'}), 400

#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({'error': 'Email already exists'}), 400

#     try:
#         user = User(
#             name=data['name'],
#             email=data['email'],
#             password=generate_password_hash(data['password']),
#             phone=data['phone']
#         )
#         db.session.add(user)
#         db.session.commit()
        
#         access_token = create_access_token(identity=user.id)
#         return jsonify({
#             'message': 'Registration successful',
#             'access_token': access_token,
#             'user': {
#                 'id': user.id,
#                 'name': user.name,
#                 'email': user.email,
#                 'phone': user.phone
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500

# # ... [rest of your routes remain the same] ...
# @app.route('/api/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email']).first()
#     if not user or not check_password_hash(user.password, data['password']):
#         return jsonify({'error': 'Invalid credentials'}), 401

#     access_token = create_access_token(identity=user.id)
#     return jsonify({
#         'access_token': access_token,
#         'user': {
#             'id': user.id,
#             'name': user.name,
#             'email': user.email,
#             'phone': user.phone
#         }
#     }), 200


# @app.route('/api/donations', methods=['POST'])
# @jwt_required()
# def create_donation():
    
#         data = request.get_json(force=True)
#         print("✅ Received data:", data)
        
#         # Validate required fields
#         required_fields = ['food_item', 'quantity', 'location', 'phone']
#         for field in required_fields:
#             if field not in data:
#                 return jsonify({'error': f'{field} is required'}), 422
#     try:    
#         # Handle optional fields (expiry_date, description)
#         expiry_date = data.get('expiry_date')
#         if expiry_date:
            
#                 # Parse the date from yyyy-mm-dd format
#                 expiry_date = datetime.strptime(expiry_date, '%Y-%m-%d')
#             except ValueError:
#                 return jsonify({'error': 'Invalid expiry date format. Use yyyy-mm-dd.'}), 422
#         description = data.get('description')
        
#         # Example: Create a new donation object
#         new_donation = Donation(
#             user_id=1,  # Assuming you retrieve the user ID somehow
#             food_item=data['food_item'],
#             quantity=data['quantity'],
#             location=data['location'],
#             phone=data['phone'],
#             expiry_date=expiry_date,
#             description=description
#         )
        
#         db.session.add(new_donation)
#         db.session.commit()
        
#         return jsonify({'message': 'Donation created!', 'donation': new_donation.id}), 201

#     except Exception as e:
#         print("❌ Error:", str(e))
#         return jsonify({'error': 'Invalid input'}), 400




# if __name__ == '__main__':
#     with app.app_context():
        
#         db.create_all()
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from datetime import datetime, timedelta
import os

app = Flask(__name__)
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:5173",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Config
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'food_donation.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '20d0296bcfab2f477587a66772651a71'  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))


class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    food_item = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))
    expiry_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='available')


# Routes
@app.route('/')
def home():
    return jsonify({
        "status": "running",
        "message": "Food Donation API",
        "endpoints": {
            "register": "POST /api/register",
            "login": "POST /api/login",
            "create_donation": "POST /api/donations (auth required)"
        }
    }), 200


@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_data = [{
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'phone': user.phone
        } for user in users]
        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received registration data:", data)

    required = ['name', 'email', 'password', 'phone']
    if not all(field in data for field in required):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400

    try:
        user = User(
            name=data['name'],
            email=data['email'],
            password=generate_password_hash(data['password']),
            phone=data['phone']
        )
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=user.id)
        return jsonify({
            'message': 'Registration successful',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone': user.phone
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'phone': user.phone
        }
    }), 200


@app.route('/api/donations', methods=['POST'])
@jwt_required()
def create_donation():
    data = request.get_json()
    print("Incoming data:", data)
    current_user_id = get_jwt_identity()

    # Required fields in snake_case
    required = ['food_item', 'quantity', 'location', 'phone']
    missing = [field for field in required if field not in data]
    if missing:
        return jsonify({'error': f'Missing required fields: {missing}'}), 422

    try:
        # Validate quantity
        try:
            quantity = int(data['quantity'])
            if quantity <= 0:
                raise ValueError("Quantity must be positive")
        except (ValueError, TypeError):
            return jsonify({'error': 'Quantity must be a positive integer'}), 422

        # Create donation with snake_case fields
        new_donation = Donation(
            user_id=current_user_id,
            food_item=data['food_item'].strip(),
            quantity=quantity,
            location=data['location'].strip(),
            phone=data['phone'].strip(),
            expiry_date=datetime.strptime(data['expiry_date'], '%Y-%m-%d').date() if data.get('expiry_date') else None,
            description=data.get('description', '').strip()
        )

        db.session.add(new_donation)
        db.session.commit()

        return jsonify({
            'message': 'Donation created successfully',
            'donation': {
                'id': new_donation.id,
                'food_item': new_donation.food_item,
                'quantity': new_donation.quantity,
                'location': new_donation.location,
                'phone': new_donation.phone,
                'expiry_date': new_donation.expiry_date.isoformat() if new_donation.expiry_date else None,
                'description': new_donation.description
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
