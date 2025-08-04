from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.models import db, Theatre

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/theatre', methods=['POST'])
@login_required
def add_theatre():
    if current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.json
    theatre = Theatre(name=data['name'], location=data['location'], representative_id=data['representative_id'])
    db.session.add(theatre)
    db.session.commit()
    return jsonify({'message': 'Theatre added'})
