

# # from flask import Flask, request, jsonify
# # from flask_sqlalchemy import SQLAlchemy
# # from werkzeug.security import generate_password_hash, check_password_hash
# # from flask_cors import CORS
# # from flask_migrate import Migrate
# # from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
# # from datetime import datetime, timedelta
# # import os

# # app = Flask(__name__)
# # CORS(app, supports_credentials=True)

# # # Config
# # basedir = os.path.abspath(os.path.dirname(__file__))
# # app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'food_donation.db')}"
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# # app.config['JWT_SECRET_KEY'] = '20d0296bcfab2f477587a66772651a71'  # Change this in production
# # app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# # db = SQLAlchemy(app)
# # migrate = Migrate(app, db)
# # jwt = JWTManager(app)

# # # Models
# # class User(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(100), nullable=False)
# #     email = db.Column(db.String(100), unique=True, nullable=False)
# #     password = db.Column(db.String(200), nullable=False)
# #     phone = db.Column(db.String(20))

# # class Donation(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
# #     food_item = db.Column(db.String(100), nullable=False)
# #     quantity = db.Column(db.Integer, nullable=False)
# #     location = db.Column(db.String(200), nullable=False)
# #     phone = db.Column(db.String(20))
# #     expiry_date = db.Column(db.DateTime)
# #     description = db.Column(db.Text)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     status = db.Column(db.String(20), default='available')
# # # In your Flask app.py, add this right before app.run()


# # @app.route('/')
# # def home():
# #     return jsonify({
# #         "status": "running",
# #         "message": "Food Donation API",
# #         "endpoints": {
# #             "register": "POST /api/register",
# #             "login": "POST /api/login",
# #             "create_donation": "POST /api/donations (auth required)"
# #         }
# #     }), 200
# # @app.route('/api/users', methods=['GET'])
# # def get_users():
# #     try:
# #         users = User.query.all()
# #         users_data = [{
# #             'id': user.id,
# #             'name': user.name,
# #             'email': user.email,
# #             'phone': user.phone,
# #             'created_at': user.created_at.isoformat() if hasattr(user, 'created_at') else None
# #         } for user in users]
# #         return jsonify(users_data), 200
# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500
# # @app.route('/api/register', methods=['POST'])
# # def register():
# #     data = request.get_json()
# #     print("Received registration data:", data)
    
# #     required = ['name', 'email', 'password', 'phone']
# #     if not all(field in data for field in required):
# #         return jsonify({'error': 'Missing required fields'}), 400

# #     if User.query.filter_by(email=data['email']).first():
# #         return jsonify({'error': 'Email already exists'}), 400

# #     try:
# #         user = User(
# #             name=data['name'],
# #             email=data['email'],
# #             password=generate_password_hash(data['password']),
# #             phone=data['phone']
# #         )
# #         db.session.add(user)
# #         db.session.commit()
        
# #         access_token = create_access_token(identity=user.id)
# #         return jsonify({
# #             'message': 'Registration successful',
# #             'access_token': access_token,
# #             'user': {
# #                 'id': user.id,
# #                 'name': user.name,
# #                 'email': user.email,
# #                 'phone': user.phone
# #             }
# #         }), 201
# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500

# # # ... [rest of your routes remain the same] ...
# # @app.route('/api/login', methods=['POST'])
# # def login():
# #     data = request.get_json()
# #     user = User.query.filter_by(email=data['email']).first()
# #     if not user or not check_password_hash(user.password, data['password']):
# #         return jsonify({'error': 'Invalid credentials'}), 401

# #     access_token = create_access_token(identity=user.id)
# #     return jsonify({
# #         'access_token': access_token,
# #         'user': {
# #             'id': user.id,
# #             'name': user.name,
# #             'email': user.email,
# #             'phone': user.phone
# #         }
# #     }), 200


# # @app.route('/api/donations', methods=['POST'])
# # @jwt_required()
# # def create_donation():
    
# #         data = request.get_json(force=True)
# #         print("✅ Received data:", data)
        
# #         # Validate required fields
# #         required_fields = ['food_item', 'quantity', 'location', 'phone']
# #         for field in required_fields:
# #             if field not in data:
# #                 return jsonify({'error': f'{field} is required'}), 422
# #     try:    
# #         # Handle optional fields (expiry_date, description)
# #         expiry_date = data.get('expiry_date')
# #         if expiry_date:
            
# #                 # Parse the date from yyyy-mm-dd format
# #                 expiry_date = datetime.strptime(expiry_date, '%Y-%m-%d')
# #             except ValueError:
# #                 return jsonify({'error': 'Invalid expiry date format. Use yyyy-mm-dd.'}), 422
# #         description = data.get('description')
        
# #         # Example: Create a new donation object
# #         new_donation = Donation(
# #             user_id=1,  # Assuming you retrieve the user ID somehow
# #             food_item=data['food_item'],
# #             quantity=data['quantity'],
# #             location=data['location'],
# #             phone=data['phone'],
# #             expiry_date=expiry_date,
# #             description=description
# #         )
        
# #         db.session.add(new_donation)
# #         db.session.commit()
        
# #         return jsonify({'message': 'Donation created!', 'donation': new_donation.id}), 201

# #     except Exception as e:
# #         print("❌ Error:", str(e))
# #         return jsonify({'error': 'Invalid input'}), 400




# # if __name__ == '__main__':
# #     with app.app_context():
        
# #         db.create_all()
# #     app.run(debug=True)
# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
# from datetime import datetime, timedelta
# import os



# app = Flask(__name__)
# CORS(app, resources={
#     r"/api/*": {
#         "origins": "http://localhost:5173",
#         "supports_credentials": True,
#         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"]
#     }
# })

# # Config
# basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'food_donation.db')}"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JWT_SECRET_KEY'] = '20d0296bcfab2f477587a66772651a71'  # Change this in production
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=90)

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
#     user_id = db.Column(db.Integer, nullable=False)
#     food_item = db.Column(db.String(100), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)
#     location = db.Column(db.String(200), nullable=False)
#     phone = db.Column(db.String(15), nullable=False)
#     expiry_date = db.Column(db.Date, nullable=True)
#     description = db.Column(db.Text, nullable=True)
#     # created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     # status = db.Column(db.String(20), default='available')
# # Routes
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
#             'phone': user.phone
#         } for user in users]
#         return jsonify(users_data), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# @app.route('/api/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
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
#         refresh_token = create_refresh_token(identity=user.id)
        
#         return jsonify({
#             'message': 'Registration successful',
#             'access_token': access_token,
#             'refresh_token': refresh_token,
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

# @app.route('/api/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email']).first()
    
#     if not user or not check_password_hash(user.password, data['password']):
#         return jsonify({'error': 'Invalid credentials'}), 401

#     access_token = create_access_token(identity=user.id)
#     refresh_token = create_refresh_token(identity=user.id)
    
#     return jsonify({
#         'access_token': access_token,
#         'refresh_token': refresh_token,
#         'user': {
#             'id': user.id,
#             'name': user.name,
#             'email': user.email,
#             'phone': user.phone
#         }
#     }), 200

# @app.route('/api/refresh', methods=['POST'])
# @jwt_required(refresh=True)
# def refresh():
#     identity = get_jwt_identity()
#     new_access_token = create_access_token(identity=identity)
#     return jsonify(access_token=new_access_token), 200

# @app.route('/api/verify-token', methods=['GET'])
# @jwt_required()
# def verify_token():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     if not user:
#         return jsonify({'error': 'User not found'}), 404

#     return jsonify({
#         'user': {
#             'id': user.id,
#             'name': user.name,
#             'email': user.email,
#             'phone': user.phone,
#         },
#     }), 200

# @app.route('/api/donations', methods=['POST'])
# @jwt_required()
# def create_donation():
#     data = request.get_json()
#     current_user_id = get_jwt_identity()

#     required_fields = {
#         'food_item': 'Food item is required',
#         'quantity': 'Quantity is required',
#         'location': 'Location is required',
#         'phone': 'Phone number is required',
#     }

#     errors = {}
#     for field, message in required_fields.items():
#         if field not in data or not data[field]:
#             errors[field] = message

#     if errors:
#         return jsonify({
#             'error': 'Missing or invalid fields',
#             'errors': errors,
#         }), 422

#     try:
#         quantity = int(data['quantity'])
#         if quantity <= 0:
#             return jsonify({
#                 'error': 'Invalid quantity',
#                 'message': 'Quantity must be a positive number',
#             }), 422
#     except (ValueError, TypeError):
#         return jsonify({
#             'error': 'Invalid quantity',
#             'message': 'Quantity must be a number',
#         }), 422

#     if not re.match(r'^\+?[0-9]{10,15}$', data['phone']):
#         return jsonify({
#             'error': 'Invalid phone',
#             'message': 'Phone number must be 10-15 digits',
#         }), 422

#     try:
#         expiry_date = None
#         if data.get('expiry_date'):
#             try:
#                 expiry_date = datetime.strptime(data['expiry_date'], '%Y-%m-%d')
#             except ValueError:
#                 return jsonify({
#                     'error': 'Invalid date format',
#                     'message': 'Expiry date must be in YYYY-MM-DD format',
#                 }), 422

#         new_donation = Donation(
#             user_id=current_user_id,
#             food_item=data['food_item'].strip(),
#             quantity=quantity,
#             location=data['location'].strip(),
#             phone=data['phone'].strip(),
#             expiry_date=expiry_date,
#             description=data.get('description', '').strip() or None,
#             status='available',
#         )

#         db.session.add(new_donation)
#         db.session.commit()

#         return jsonify({
#             'message': 'Donation created successfully',
#             'donation': {
#                 'id': new_donation.id,
#                 'food_item': new_donation.food_item,
#                 'quantity': new_donation.quantity,
#                 'location': new_donation.location,
#                 'phone': new_donation.phone,
#                 'expiry_date': new_donation.expiry_date.isoformat() if new_donation.expiry_date else None,
#                 'description': new_donation.description,
#                 'status': new_donation.status,
#             },
#         }), 201

#     except Exception as e:
#         db.session.rollback()
#         return jsonify({
#             'error': 'Server error',
#             'message': str(e),
#         }), 500

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)

import re
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:5173",
        "supports_credentials": True,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Config
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'food_donation.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '20d0296bcfab2f477587a66772651a71'  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=90)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Enable CORS for frontend origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    food_item = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    expiry_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='available')

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    donation_id = db.Column(db.Integer, nullable=False)
    requester_name = db.Column(db.String(100), nullable=False)
    requester_phone = db.Column(db.String(15), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# JWT Error Handlers
@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'error': 'Invalid token', 'message': str(error)}), 422

@jwt.unauthorized_loader
def unauthorized_callback(error):
    return jsonify({'error': 'Missing or invalid Authorization header', 'message': str(error)}), 401

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({'error': 'Token expired', 'message': 'The token has expired'}), 401

# Routes
@app.route('/')
def home():
    return jsonify({
        "status": "running",
        "message": "Food Donation API",
        "endpoints": {
            "register": "POST /api/register",
            "login": "POST /api/login",
            "create_donation": "POST /api/donations (auth required)",
            "get_donations": "GET /api/donations (auth required)",
            "get_available_donations": "GET /api/donations/available (auth required)",
            "create_request": "POST /api/requests (auth required)",
            "get_my_donation_requests": "GET /api/requests/my-donations (auth required)",
            "delete_donation": "DELETE /api/donations/<id> (auth required)"
        }
    }), 200

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_data = [{'id': user.id, 'name': user.name, 'email': user.email, 'phone': user.phone} for user in users]
        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
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
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        return jsonify({
            'message': 'Registration successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {'id': user.id, 'name': user.name, 'email': user.email, 'phone': user.phone}
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
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {'id': user.id, 'name': user.name, 'email': user.email, 'phone': user.phone}
    }), 200

@app.route('/api/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        identity = get_jwt_identity()
        new_access_token = create_access_token(identity=identity)
        return jsonify({'access_token': new_access_token}), 200
    except Exception as e:
        return jsonify({'error': 'Refresh token invalid', 'message': str(e)}), 422

@app.route('/api/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'user': {'id': user.id, 'name': user.name, 'email': user.email, 'phone': user.phone}}), 200
    except Exception as e:
        return jsonify({'error': 'Token verification failed', 'message': str(e)}), 422

@app.route('/api/donations', methods=['POST'])
@jwt_required()
def create_donation():
    data = request.get_json()
    current_user_id = int(get_jwt_identity())
    required_fields = {'food_item': 'Food item is required', 'quantity': 'Quantity is required', 'location': 'Location is required', 'phone': 'Phone number is required'}
    errors = {field: message for field, message in required_fields.items() if field not in data or not data[field]}
    if errors:
        return jsonify({'error': 'Missing or invalid fields', 'errors': errors}), 422
    try:
        quantity = int(data['quantity'])
        if quantity <= 0:
            return jsonify({'error': 'Invalid quantity', 'message': 'Quantity must be a positive number'}), 422
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid quantity', 'message': 'Quantity must be a number'}), 422
    if not re.match(r'^\+?[0-9]{10,15}$', data['phone']):
        return jsonify({'error': 'Invalid phone', 'message': 'Phone number must be 10-15 digits'}), 422
    try:
        expiry_date = None
        if data.get('expiry_date'):
            try:
                expiry_date = datetime.strptime(data['expiry_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid date format', 'message': 'Expiry date must be in YYYY-MM-DD format'}), 422
        new_donation = Donation(
            user_id=current_user_id,
            food_item=data['food_item'].strip(),
            quantity=quantity,
            location=data['location'].strip(),
            phone=data['phone'].strip(),
            expiry_date=expiry_date,
            description=data.get('description', '').strip() or None,
            status='available'
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
                'expiry_date': new_donation.expiry_date.strftime('%Y-%m-%d') if new_donation.expiry_date else None,
                'description': new_donation.description,
                'status': new_donation.status
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Server error', 'message': str(e)}), 500
@app.route('/api/donations/<int:id>', methods=['GET'])
@jwt_required()
def get_donation(id):
    current_user_id = get_jwt_identity()
    donation = Donation.query.filter_by(id=id, user_id=current_user_id).first()
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404
    return jsonify({
        'id': donation.id,
        'food_item': donation.food_item,
        'quantity': donation.quantity,
        'location': donation.location,
        'phone': donation.phone,
        'expiry_date': donation.expiry_date.isoformat() if donation.expiry_date else None,
        'description': donation.description,
        'status': donation.status
    })

@app.route('/api/donations/<int:id>', methods=['PUT'])
@jwt_required()
def update_donation(id):
    current_user_id = get_jwt_identity()
    donation = Donation.query.filter_by(id=id, user_id=current_user_id).first()
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    data = request.get_json()
    donation.food_item = data.get('food_item', donation.food_item)
    donation.quantity = data.get('quantity', donation.quantity)
    donation.location = data.get('location', donation.location)
    donation.phone = data.get('phone', donation.phone)
    donation.expiry_date = datetime.strptime(data['expiry_date'], '%Y-%m-%d').date() if data.get('expiry_date') else None
    donation.description = data.get('description', donation.description)
    donation.status = data.get('status', donation.status)

    db.session.commit()
    return jsonify({'message': 'Donation updated successfully'})
    
@app.route('/api/donations', methods=['GET'])
@jwt_required()
def get_donations():
    current_user_id = int(get_jwt_identity())
    try:
        donations = Donation.query.filter_by(user_id=current_user_id).all()
        donations_data = [{
            'id': donation.id,
            'user_id': donation.user_id,
            'food_item': donation.food_item,
            'quantity': donation.quantity,
            'location': donation.location,
            'phone': donation.phone,
            'expiry_date': donation.expiry_date.strftime('%Y-%m-%d') if donation.expiry_date else None,
            'description': donation.description,
            'status': donation.status
        } for donation in donations]
        return jsonify(donations_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/donations/available', methods=['GET'])
@jwt_required()
def get_available_donations():
    try:
        current_user_id = int(get_jwt_identity())
        donations = Donation.query.filter_by(status='available').filter(Donation.user_id != current_user_id).all()
        donations_data = []
        for donation in donations:
            expiry_date = None
            if donation.expiry_date:
                try:
                    app.logger.info(f"Processing donation {donation.id} expiry_date: {donation.expiry_date} (type: {type(donation.expiry_date)})")
                    if isinstance(donation.expiry_date, (datetime, db.Date)):
                        expiry_date = donation.expiry_date.strftime('%Y-%m-%d')
                    elif isinstance(donation.expiry_date, str):
                        try:
                            expiry_date = datetime.strptime(donation.expiry_date, '%Y-%m-%d %H:%M:%S.%f').strftime('%Y-%m-%d')
                        except ValueError:
                            expiry_date = datetime.strptime(donation.expiry_date, '%Y-%m-%d').strftime('%Y-%m-%d')
                    else:
                        app.logger.warning(f"Unexpected expiry_date type for donation {donation.id}: {type(donation.expiry_date)}")
                except Exception as e:
                    app.logger.error(f"Invalid expiry_date for donation {donation.id}: {donation.expiry_date}, error: {str(e)}")
                    expiry_date = None
            donations_data.append({
                'id': donation.id,
                'user_id': donation.user_id,
                'food_item': donation.food_item,
                'quantity': donation.quantity,
                'location': donation.location,
                'phone': donation.phone,
                'expiry_date': expiry_date,
                'description': donation.description,
                'status': donation.status
            })
        return jsonify(donations_data), 200
    except Exception as e:
        app.logger.error(f"Error in get_available_donations: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/donations/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_donation(id):
    try:
        current_user_id = int(get_jwt_identity())
        donation = Donation.query.get(id)
        if not donation:
            return jsonify({'error': 'Donation not found'}), 404
        if donation.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized: You can only delete your own donations'}), 403
        db.session.delete(donation)
        db.session.commit()
        return jsonify({'message': 'Donation deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/requests', methods=['POST'])
@jwt_required()
def create_request():
    data = request.get_json()
    current_user_id = int(get_jwt_identity())
    if 'donation_id' not in data:
        return jsonify({'error': 'Donation ID is required'}), 400
    try:
        donation = Donation.query.get(data['donation_id'])
        if not donation:
            return jsonify({'error': 'Donation not found'}), 404
        if donation.status != 'available':
            return jsonify({'error': 'Donation is not available'}), 400
        if donation.user_id == current_user_id:
            return jsonify({'error': 'Cannot request your own donation'}), 400
        requester = User.query.get(current_user_id)
        new_request = Request(
            user_id=current_user_id,
            donation_id=donation.id,
            requester_name=requester.name,
            requester_phone=requester.phone
        )
        donation.status = 'requested'
        db.session.add(new_request)
        db.session.commit()
        return jsonify({
            'message': 'Request created successfully',
            'request': {
                'id': new_request.id,
                'user_id': new_request.user_id,
                'donation_id': new_request.donation_id,
                'requester_name': new_request.requester_name,
                'requester_phone': new_request.requester_phone,
                'created_at': new_request.created_at.isoformat()
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/requests/my-donations', methods=['GET'])
@jwt_required()
def get_my_donation_requests():
    try:
        current_user_id = int(get_jwt_identity())
        requests = db.session.query(Request, Donation).join(Donation, Request.donation_id == Donation.id).filter(Donation.user_id == current_user_id).all()
        requests_data = [{
            'request_id': req.id,
            'donation_id': req.donation_id,
            'food_item': donation.food_item,
            'quantity': donation.quantity,
            'location': donation.location,
            'requester_name': req.requester_name,
            'requester_phone': req.requester_phone,
            'created_at': req.created_at.isoformat()
        } for req, donation in requests]
        return jsonify(requests_data), 200
    except Exception as e:
        app.logger.error(f"Error in get_my_donation_requests: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
