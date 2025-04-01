
# from flask import Blueprint, render_template, request, flash, redirect, url_for
# from backend.models import User
# from backend import db, bcrypt
# from flask_login import login_user, logout_user

# auth_bp = Blueprint('auth', __name__)

# # backend/routes/auth_routes.py
# @auth_bp.route('/register', methods=['GET', 'POST'])
# def register():
#     # if request.method == 'POST':
#     #     # Check if user exists
#     #     user = User.query.filter_by(email=request.form['email']).first()
#     #     if user:
#     #         flash('Email already exists!', 'danger')
#     #         return redirect(url_for('auth.register'))
        
#     #     # Create new user
#     #     hashed_pw = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')
#     #     new_user = User(
#     #         username=request.form['username'],
#     #         email=request.form['email'],
#     #         password=hashed_pw
#     #     )
#     #     db.session.add(new_user)
#     #     db.session.commit()
#     #     flash('Account created! Please log in.', 'success')
#     #     return redirect(url_for('auth.login'))
    
#     return render_template('auth/register.html')

# @auth_bp.route('/test_template')
# def test_template():
#     return  "Direct response works!"
from flask import Blueprint, render_template, request, flash, redirect, url_for
from backend.models import User
from backend import db, bcrypt
from flask_login import login_user, current_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if not all([username, email, password]):
            flash('Please fill all fields', 'danger')
            return redirect(url_for('auth.register'))

        if User.query.filter_by(email=email).first():
            flash('Email already exists', 'danger')
            return redirect(url_for('auth.register'))

        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=hashed_pw)
        
        try:
            db.session.add(user)
            db.session.commit()
            flash('Account created! Please log in', 'success')
            return redirect(url_for('auth.login'))
        except:
            db.session.rollback()
            flash('Registration failed', 'danger')
    
    return render_template('auth/register.html')
@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Login logic here
        return redirect(url_for('main.index'))
    return render_template('auth/login.html')