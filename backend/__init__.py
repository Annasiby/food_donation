
# import os
# from flask import Flask
# from backend.config import Config
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager
# from flask_migrate import Migrate

# # Initialize extensions (NO `app` yet)
# db = SQLAlchemy()
# bcrypt = Bcrypt()
# login_manager = LoginManager()
# migrate = Migrate()
# login_manager.login_view = 'auth.login'

# def create_app():
#     base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     template_dir = os.path.join(base_dir, 'backend', 'templates')
#     app = Flask(__name__,
#                template_folder=template_dir,
#                static_folder=os.path.join(base_dir, 'backend', 'static'))
#     app.config['TEMPLATES_AUTO_RELOAD'] = True
#     app.config.from_object('config.Config')

#     # Initialize extensions with the app
#     db.init_app(app)
#     bcrypt.init_app(app)
#     login_manager.init_app(app)
#     migrate.init_app(app, db)

#     # Import and register Blueprints (AFTER initializing app)
#     from backend.routes.auth_routes import auth_bp
#     from backend.routes.donation_routes import donation_bp
#     from backend.routes.request_routes import request_bp
#     from backend.routes.main_routes import main_bp
    
#     app.register_blueprint(auth_bp, url_prefix='/auth')
#     app.register_blueprint(donation_bp, url_prefix="/donation")
#     app.register_blueprint(request_bp, url_prefix="/request")
#     app.register_blueprint(main_bp)

#     return app

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
import os

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
from backend.models import User, Donation, Request 

def create_app():
    app = Flask(
        __name__,
        template_folder=os.path.abspath('backend/templates'),  # Absolute path
        static_folder=os.path.abspath('backend/static'))
    app.config.from_object('backend.config.Config')

    login_manager.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    
    login_manager.login_view = 'auth.login'

    from backend.routes.auth_routes import auth_bp
    from backend.routes.main_routes import main_bp
    from backend.donation_routes import donation_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(main_bp)
    app.register_blueprint(donation_bp)

    return app