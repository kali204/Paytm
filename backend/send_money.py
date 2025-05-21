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
    """Handles money transfer between users using stored procedure"""

    conn = None
    cursor = None  

    try:
        data = request.json
        sender_email = get_jwt_identity()
        recipient_phone = data.get("recipient_phone")
        amount = data.get("amount")
        note = data.get("note", "")  # Optional note (not passed to procedure)

        if not sender_email or not recipient_phone or amount is None:
            return jsonify({"error": "Missing required fields"}), 400

        try:
            amount = float(amount)
            if amount <= 0:
                return jsonify({"error": "Invalid amount, must be greater than 0"}), 400
        except ValueError:
            return jsonify({"error": "Amount must be a valid number"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute("SELECT id FROM users WHERE email = %s", (sender_email,))
        sender = cursor.fetchone()

        cursor.execute("SELECT id, name FROM users WHERE phone = %s", (recipient_phone,))
        receiver = cursor.fetchone()

        if not sender:
            return jsonify({"error": "Sender not found"}), 404
        if not receiver:
            return jsonify({"error": "Receiver not found"}), 404

        sender_id = sender["id"]
        receiver_id = receiver["id"]
        receiver_name = receiver["name"]

        cursor.execute("SELECT balance FROM accounts WHERE user_id = %s", (sender_id,))
        sender_account = cursor.fetchone()

        if not sender_account:
            return jsonify({"error": "Sender account not found"}), 404

        sender_balance = sender_account["balance"]

        if sender_balance < amount:
            return jsonify({"error": "Insufficient funds"}), 400

        print(f"🔄 Attempting to transfer ₹{amount} from {sender_email} to {recipient_phone}")
        
        # ✅ Only pass 3 arguments as required
        cursor.callproc("transfer_money", (sender_id, receiver_id, amount))
        conn.commit()

        print("✅ Transaction Successful!")
        return jsonify({
            "message": "Transaction successful!",
            "receiver_name": receiver_name
        }), 200

    except pymysql.err.IntegrityError as e:
        conn.rollback()
        print(f"❌ Integrity Error: {e}")
        return jsonify({"error": "Integrity Error - Possible constraint violation", "details": str(e)}), 400

    except pymysql.err.OperationalError as e:
        conn.rollback()
        print(f"❌ Operational Error: {e}")
        return jsonify({"error": "Database Operational Error", "details": str(e)}), 500

    except pymysql.MySQLError as e:
        conn.rollback()
        print(f"❌ MySQL Error: {e}")
        return jsonify({"error": f"MySQL Error: {str(e)}"}), 500

    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return jsonify({"error": f"Unexpected Error: {str(e)}"}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
