# import os

# class Config:
#     BASE_DIR = os.path.abspath(os.path.dirname(__file__))
#     SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'database.db')}"
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', '20d0296bcfab2f477587a66772651a71')
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'instance', 'database.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
