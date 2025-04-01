from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)

@main_bp.route('/')
def home():
    return "Homepage - Food Donation App"
@main_bp.route('/dashboard')
def dashboard():
    return "Dashboard: View Donations and Requests"
@main_bp.app_errorhandler(404)
def page_not_found(e):
    return "Custom 404 Message", 404