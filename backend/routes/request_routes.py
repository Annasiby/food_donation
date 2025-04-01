from flask import Blueprint, request, jsonify
from backend import db
from backend.models import Request

request_bp = Blueprint('request', __name__)

@request_bp.route('/add', methods=['POST'])
def add_request():
    data = request.json
    new_request = Request(**data)
    db.session.add(new_request)
    db.session.commit()
    return jsonify({"message": "Request added successfully!"}), 201

@request_bp.route('/all', methods=['GET'])
def get_all_requests():
    requests = Request.query.all()
    return jsonify([{
        "id": r.id,
        "requester_name": r.requester_name,
        "requested_item": r.requested_item,
        "quantity_needed": r.quantity_needed,
        "location": r.location,
        "status": r.status
    } for r in requests])
