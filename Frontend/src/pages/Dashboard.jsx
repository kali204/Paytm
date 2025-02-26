import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(null); // Store balance
  const [user, setUser] = useState(null); // Store user info
  const [error, setError] = useState(null); // Store any error that occurs
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          setBalance(response.data.balance); // Set balance in state
          setUser(response.data.user); // Store user info
        }
      } catch (error) {
        console.error("Error fetching balance:", error.response || error.message || error);
        setError("Error fetching balance.");
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/signin"); // Navigate to the sign-in page
  };

  return (
    <div>
      {/* Navbar with Username and Transactions Button */}
      <AppBar>
        <span className="text-white font-bold mx-2">
          Hello, {user ? user.name : "User"}
        </span>
        <button
          onClick={() => navigate("/transactions")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Transactions
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </AppBar>

      <div className="m-8">
        {/* Show the balance if it is fetched */}
        {error ? (
          <div className="text-red-500 text-sm">{error}</div> // Display error if any
        ) : (
          <Balance value={balance} /> // Show balance component
        )}
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
