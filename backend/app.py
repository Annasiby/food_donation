
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
# import os
# from backend import db, bcrypt, login_manager, migrate

# from backend.config import Config
# from backend.routes.auth_routes import auth_bp
# from backend.routes.donation_routes import donation_bp
# from backend.routes.request_routes import request_bp
# from backend.routes.main_routes import main_bp

# def create_app():
#     app = Flask(__name__, template_folder='backend/templates')
#     app.config.from_object(Config)

#     # Initialize extensions
#     db.init_app(app)
#     bcrypt.init_app(app)
#     login_manager.init_app(app)
#     migrate.init_app(app, db)

#     # Register Blueprints
#     app.register_blueprint(auth_bp, url_prefix='/auth')
#     app.register_blueprint(donation_bp, url_prefix='/donation')
#     app.register_blueprint(request_bp, url_prefix='/request')
#     app.register_blueprint(main_bp)  # No prefix for dashboard and homepage

#     print("Registered routes:")
#     for rule in app.url_map.iter_rules():
#         print(f"{rule.endpoint}: {rule}")
#     @app.route("/test")  # Add this temporary route
#     def test():
#         return "Flask is running!"
#     return app

# if __name__ == "__main__":
#     app = create_app()
#     app.run(debug=True)
from flask import Flask
from backend.config import Config
from backend import db, bcrypt, login_manager, migrate

def create_app():
    # Initialize Flask app with proper template folder
    app = Flask(__name__, template_folder='templates')
    
    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions with the app
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    # Import blueprints here to avoid circular imports
    from backend.routes.auth_routes import auth_bp
    from backend.routes.donation_routes import donation_bp
    from backend.routes.request_routes import request_bp
    from backend.routes.main_routes import main_bp

    # Register blueprints with URL prefixes
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donation_bp, url_prefix='/donations')
    app.register_blueprint(request_bp, url_prefix='/requests')
    app.register_blueprint(main_bp)  # No prefix for main routes

    # Simple test route
    @app.route('/healthcheck')
    def healthcheck():
        return "Server is running", 200

    return app

# Create app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)