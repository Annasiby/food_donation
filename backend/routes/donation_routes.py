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
from flask import Blueprint, request, jsonify
from backend import db
from backend.models import Donation

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/add', methods=['POST'])
def add_donation():
    data = request.json
    new_donation = Donation(**data)
    db.session.add(new_donation)
    db.session.commit()
    return jsonify({"message": "Donation added successfully!"}), 201

@donation_bp.route('/all', methods=['GET'])
def get_all_donations():
    donations = Donation.query.all()
    return jsonify([{
        "id": d.id,
        "donor_name": d.donor_name,
        "food_item": d.food_item,
        "quantity": d.quantity,
        "location": d.location,
        "status": d.status
    } for d in donations])
