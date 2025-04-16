from flask import Blueprint, render_template
from flask_login import login_required, current_user
from backend.models import Donation

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return render_template('main/index.html')

# @main_bp.route('/dashboard')
# @login_required
# def dashboard():
#     user_donations = Donation.query.filter_by(user_id=current_user.id).order_by(Donation.created_at.desc()).all()
#     return render_template('main/dashboard.html', donations=user_donations)

@main_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('main/dashboard.html')
    
@main_bp.app_errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404