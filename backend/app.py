from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import pymysql.cursors
import os
from dotenv import load_dotenv
from balance import balance_bp
from user import user_bp
# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configurations
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default-secret-key')  
jwt = JWTManager(app)
CORS(app)

# Function to get a MySQL database connection
def get_db_connection():
    return pymysql.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        user=os.getenv('DB_USER', 'root'),
        password=os.getenv('DB_PASSWORD', '1947'),
        db=os.getenv('DB_NAME', 'payme'),
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True  # Automatically commits changes
    )

# Route to register a user
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    username = data.get('username')  # Email as username
    password = data.get('password')  # Plain password
    phone = data.get('phone')  

    if not first_name or not last_name or not username or not password or not phone:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                # Check if the email or phone already exists
                cursor.execute("SELECT * FROM users WHERE email = %s OR phone = %s", (username, phone))
                if cursor.fetchone():
                    return jsonify({"error": "User already exists"}), 400

                # Insert new user into the database
                cursor.execute("""
                    INSERT INTO users (name, email, phone, password, balance) 
                    VALUES (%s, %s, %s, %s, %s)
                """, (f"{first_name} {last_name}", username, phone, password, 0.00))

                user_id = cursor.lastrowid

                # Create an account for the new user
                cursor.execute("INSERT INTO accounts (user_id, balance) VALUES (%s, %s)", (user_id, 1000.00))

                # Generate JWT token after registration
                access_token = create_access_token(identity=username)

                return jsonify({"message": "User registered successfully", "token": access_token}), 201

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Error registering user: {str(e)}"}), 500

# Login Logic
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')  
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, email, password FROM users WHERE email = %s", (username,))
                user = cursor.fetchone()

                if not user:
                    return jsonify({"error": "User not found"}), 404

                if user['password'] == password:  # Plain text comparison
                    access_token = create_access_token(identity=username)

                    # Check if user exists in accounts table
                    cursor.execute("SELECT * FROM accounts WHERE user_id = %s", (user['id'],))
                    account = cursor.fetchone()

                    if not account:
                        cursor.execute("INSERT INTO accounts (user_id, balance) VALUES (%s, %s)", (user['id'], 1000.00))

                    return jsonify({"message": "Login successful", "access_token": access_token}), 200

                else:
                    return jsonify({"error": "Invalid username or password"}), 401

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Error logging in user: {str(e)}"}), 500

# Register the balance blueprint
app.register_blueprint(balance_bp)
app.register_blueprint(user_bp)
from send_money import send_money_bp
app.register_blueprint(send_money_bp)
from transactions import transactions_bp
app.register_blueprint(transactions_bp)

# Start the Flask server
if __name__ == '__main__':
    app.run(debug=True)
