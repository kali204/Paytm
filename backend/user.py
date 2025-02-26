from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import pymysql
from db import get_db_connection  # Import DB function from `app.py`

user_bp = Blueprint("user_bp", __name__)

# ✅ Fetch all users
@user_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id, name, email FROM users")
        users = cursor.fetchall()
        connection.close()

        if not users:
            return jsonify({"message": "No users found"}), 404

        return jsonify({"users": users}), 200

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500


# ✅ Fetch a specific user by ID
@user_bp.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id, name, email FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        connection.close()

        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify({"user": user}), 200

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500


# ✅ (Optional) Add a new user
@user_bp.route("/users", methods=["POST"])
@jwt_required()
def add_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    
    if not name or not email:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
        connection.commit()
        connection.close()

        return jsonify({"message": "User added successfully"}), 201

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

