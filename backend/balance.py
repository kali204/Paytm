from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import pymysql.cursors
from db import get_db_connection  # Import database connection function

balance_bp = Blueprint('balance', __name__)  # Create a Flask Blueprint

# **Route to get balance**
@balance_bp.route('/account/balance', methods=['GET'])
@jwt_required()
def get_balance():
    current_user = get_jwt_identity()
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name FROM users WHERE email = %s", (current_user,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "User not found"}), 404

    cursor.execute("SELECT balance FROM accounts WHERE user_id = %s", (user["id"],))
    account = cursor.fetchone()

    balance = account["balance"] if account else 0.0
    connection.close()

    return jsonify({"balance": balance, "user": {"id": user["id"], "name": user["name"]}})