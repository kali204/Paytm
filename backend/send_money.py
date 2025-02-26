from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import pymysql
from db import get_db_connection
from flask_cors import CORS

# Create Blueprint
send_money_bp = Blueprint("send_money", __name__)
CORS(send_money_bp)  # Enable CORS

@send_money_bp.route("/account/send_money", methods=["POST"])
@jwt_required()
def send_money():
    """Handles money transfer between users, ensuring ACID compliance"""
    
    conn = None  # ✅ Initialize `conn` to avoid UnboundLocalError
    cursor = None  # ✅ Initialize `cursor` to avoid UnboundLocalError

    try:
        data = request.json
        sender_email = get_jwt_identity()  # Get sender's email from JWT
        receiver_email = data.get("receiver_email")
        amount = data.get("amount")

        # 🔥 Validate input
        if not sender_email or not receiver_email or not amount:
            return jsonify({"error": "Missing required fields"}), 400
        
        try:
            amount = float(amount)  # Ensure amount is a valid float
            if amount <= 0:
                return jsonify({"error": "Invalid amount"}), 400
        except ValueError:
            return jsonify({"error": "Amount must be a valid number"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        # 🔍 Get sender ID and balance
        cursor.execute(
            """
            SELECT u.id AS user_id, a.balance 
            FROM users u 
            JOIN accounts a ON u.id = a.user_id 
            WHERE u.email = %s
            """,
            (sender_email,)
        )
        sender = cursor.fetchone()

        if not sender:
            return jsonify({"error": "Sender not found"}), 400

        # 🔍 Get receiver ID and ensure they exist in accounts
        cursor.execute(
            """
            SELECT u.id AS user_id 
            FROM users u 
            JOIN accounts a ON u.id = a.user_id 
            WHERE u.email = %s
            """,
            (receiver_email,)
        )
        receiver = cursor.fetchone()

        if not receiver:
            return jsonify({"error": "Receiver not found"}), 400

        # ✅ Ensure sender has enough balance
        if sender["balance"] < amount:
            return jsonify({"error": "Insufficient balance"}), 400

        sender_id = sender["user_id"]
        receiver_id = receiver["user_id"]

        # 🔄 Start ACID transaction
        conn.begin()

        # 🔽 Deduct from sender
        cursor.execute(
            "UPDATE accounts SET balance = balance - %s WHERE user_id = %s",
            (amount, sender_id),
        )

        # 🔼 Credit receiver
        cursor.execute(
            "UPDATE accounts SET balance = balance + %s WHERE user_id = %s",
            (amount, receiver_id),
        )

        # 📝 Insert transaction record
        cursor.execute(
            """
            INSERT INTO transactions (sender_id, receiver_id, amount, status) 
            VALUES (%s, %s, %s, 'success')
            """,
            (sender_id, receiver_id, amount),
        )

        conn.commit()  # ✅ Commit transaction
        return jsonify({"message": "Transaction successful"}), 200

    except pymysql.MySQLError as e:
        if conn:
            conn.rollback()  # 🔄 Rollback on failure
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        if cursor:
            cursor.close()  # ✅ Close cursor only if it exists
        if conn:
            conn.close()  # ✅ Close connection only if it exists
