from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.models import db, Show

rep_bp = Blueprint('rep', __name__)

@rep_bp.route('/rep/show', methods=['POST'])
@login_required
def add_show():
    if current_user.role != 'representative':
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.json
    show = Show(theatre_id=data['theatre_id'], movie_id=data['movie_id'], timing=data['timing'], price=data['price'], seats=data['seats'])
    db.session.add(show)
    db.session.commit()
    return jsonify({'message': 'Show added'})
