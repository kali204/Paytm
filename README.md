# **Paytm Clone**  

Paytm Clone is a full-stack web application that replicates online payment functionalities like money transfers, transaction history, and account balance tracking.  

<div align="center">
  <img src="https://i.ibb.co/6YG4Wf5/background.jpg" alt="Paytm Clone Logo">
</div>

## **Features**  
✅ User authentication (Signup/Login) using JWT  
✅ Secure money transfer between users  
✅ View transaction history  
✅ Check account balance  
✅ Fast and responsive UI  

---

## **Setup Instructions**  

### **1. Prerequisites**  
- **Python 3** installed  
- **MySQL Server** installed and running  
- **Node.js** and **npm** installed  

### **2. Backend Setup (Flask + MySQL)**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/kali204/Paytm.git
2. Navigate to the backend directory:

cd Paytm/backend

3. Create a virtual environment and activate it:

python -m venv venv  
source venv/bin/activate  # On Windows: venv\Scripts\activate

4. Install dependencies:

pip install -r requirements.txt

5. Set up the .env file in the backend directory:

DATABASE_URL=mysql+pymysql://username:password@localhost/paytm_clone
JWT_SECRET_KEY=your_secret_key

## 2: Apply database migrations:

flask db upgrade

1. Start the Flask server:

    flask run

    The API will be available at http://127.0.0.1:5000/

## 3. Frontend Setup (React.js + Tailwind CSS)

    Navigate to the frontend directory:

cd ../frontend

1. Install frontend dependencies:

npm install

2. Start the React frontend:

    npm run dev

4. Running the Application

Once both backend and frontend are running, open your browser and visit:

http://localhost:3000

Tech Stack

✅ Frontend: React.js, Tailwind CSS
✅ Backend: Flask, Flask-JWT
✅ Database: MySQL
✅ Authentication: JWT
Contributing

Want to contribute? Fork the repository and submit a pull request!

Let me know if you need any changes! 🚀


Now, save this content in your **README.md** file inside your project directory. 🚀

