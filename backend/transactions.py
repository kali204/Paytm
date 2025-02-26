from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import pymysql
from db import get_db_connection  # Import database connection function

# Create Blueprint
transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/account/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    user_email = get_jwt_identity()  # Get logged-in user's email from JWT

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get user ID from email
        cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_id = user["id"]

        # Fetch transactions where the user is either sender or receiver
        cursor.execute("""
            SELECT 
                t.id, 
                u1.email AS sender_email, 
                u2.email AS receiver_email, 
                CAST(t.amount AS DECIMAL(10,2)) AS amount,  -- Ensure amount is decimal
                t.status, 
                t.timestamp
            FROM transactions t
            JOIN users u1 ON t.sender_id = u1.id
            JOIN users u2 ON t.receiver_id = u2.id
            WHERE t.sender_id = %s OR t.receiver_id = %s
            ORDER BY t.timestamp DESC
        """, (user_id, user_id))

        transactions = cursor.fetchall()

        # Ensure amount is returned as float
        for transaction in transactions:
            transaction["amount"] = float(transaction["amount"])

        return jsonify(transactions), 200

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
