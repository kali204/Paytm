from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import pymysql
from db import get_db_connection

# Create Blueprint
profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/account/profile", methods=["GET"])
@jwt_required()
def get_profile():
    """Fetches the user's profile details"""
    conn = None
    cursor = None

    try:
        user_email = get_jwt_identity()  # Get user's email from JWT
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        # Fetch user details from the database
        cursor.execute("SELECT firstName, lastName, email FROM users WHERE email = %s", (user_email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"user": user}), 200

    except pymysql.MySQLError as e:
        print(f"❌ MySQL Error: {e}")
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return jsonify({"error": "Unexpected error"}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@profile_bp.route("/account/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    """Updates the user's profile details"""
    conn = None
    cursor = None

    try:
        user_email = get_jwt_identity()  # Get user's email from JWT
        data = request.json
        firstName = data.get("firstName")
        lastName = data.get("lastName")

        # Validate input
        if not firstName or not lastName:
            return jsonify({"error": "First name and last name are required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        # Update user details in the database
        cursor.execute(
            "UPDATE users SET firstName = %s, lastName = %s WHERE email = %s",
            (firstName, lastName, user_email)
        )
        conn.commit()

        return jsonify({"message": "Profile updated successfully"}), 200

    except pymysql.MySQLError as e:
        conn.rollback()
        print(f"❌ MySQL Error: {e}")
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return jsonify({"error": "Unexpected error"}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()