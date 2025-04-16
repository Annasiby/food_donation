# from flask import Blueprint, request, redirect, url_for, flash
# from flask_login import login_required, current_user
# from backend.app import db
# from backend.models import Donation

# bp = Blueprint('donation', __name__)

# @bp.route('/donate', methods=['GET', 'POST'])
# @login_required
# def donate():
#     if request.method == 'POST':
#         food_item = request.form['food_item']
#         quantity = request.form['quantity']

#         donation = Donation(donor_id=current_user.id, food_item=food_item, quantity=quantity)
#         db.session.add(donation)
#         db.session.commit()
#         flash('Donation recorded successfully!', 'success')
#         return redirect(url_for('dashboard'))

#     return render_template('donate.html')
from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from backend.models import Donation
from backend import db
from flask_login import login_required, current_user

donation_bp = Blueprint('donation', __name__, url_prefix='/donations')

# @donation_bp.route('/new', methods=['GET', 'POST'])
# @login_required
# def new_donation():
#     if request.method == 'POST':
#         try:
#             food_item = request.form.get('food_item')
#             quantity = request.form.get('quantity')
#             location = request.form.get('location')
            
#             if not all([food_item, quantity, location]):
#                 flash('Please fill all fields', 'danger')
#                 return redirect(url_for('donation.new_donation'))

#             donation = Donation(
#                 food_item=food_item,
#                 quantity=int(quantity),
#                 location=location,
#                 user_id=current_user.id
#             )
            
#             db.session.add(donation)
#             db.session.commit()
            
#             flash('Donation successfully created!', 'success')
#             return redirect(url_for('main.dashboard'))
            
#         except ValueError:
#             flash('Quantity must be a number', 'danger')
#             return redirect(url_for('donation.new_donation'))
            
#         except Exception as e:
#             db.session.rollback()
#             flash('Error creating donation', 'danger')
#             return redirect(url_for('donation.new_donation'))
    
#     return render_template('donation/new.html')
# backend/routes/main_routes.py
@main_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('main/dashboard.html')

# backend/routes/donation_routes.py
@donation_bp.route('/new', methods=['GET', 'POST'])
@login_required
def new_donation():
    if request.method == 'POST':
        try:
            donation = Donation(
                food_item=request.form['food_item'],
                quantity=request.form['quantity'],
                location=request.form['location'],
                user_id=current_user.id
            )
            db.session.add(donation)
            db.session.commit()
            flash('Donation added!', 'success')
            return redirect(url_for('main.dashboard'))
        except:
            db.session.rollback()
            flash('Error creating donation', 'danger')
    return render_template('donation/new.html')
# backend/routes/donation_routes.py
@donation_bp.route('/api/new', methods=['POST'])
@login_required
def api_new_donation():
    data = request.get_json()
    donation = Donation(
        food_item=data['food_item'],
        quantity=data['quantity'],
        location=data['location'],
        user_id=current_user.id
    )
    db.session.add(donation)
    db.session.commit()
    return jsonify({"message": "Donation created!"}), 201
    
@donation_bp.route('/add', methods=['POST'])
@login_required
def add_donation():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    try:
        new_donation = Donation(
            food_item=data.get('food_item'),
            quantity=data.get('quantity'),
            location=data.get('location'),
            user_id=current_user.id
        )
        db.session.add(new_donation)
        db.session.commit()
        return jsonify({"message": "Donation added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@donation_bp.route('/all', methods=['GET'])
@login_required
def get_all_donations():
    donations = Donation.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        "id": d.id,
        "food_item": d.food_item,
        "quantity": d.quantity,
        "location": d.location,
        "status": d.status,
        "created_at": d.created_at.isoformat() if d.created_at else None
    } for d in donations])