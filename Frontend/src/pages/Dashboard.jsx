import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { CircularProgress, Snackbar } from "@mui/material";
import TransactionsPreview from "../components/TransactionsPreview";
import QuickActions from "../components/QuickActions.jsx";
import Analytics from "../components/Analytics";


const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/account/balance", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.status === 200) {
          console.log("Full API Response:", response.data); // Check user fields
          setBalance(response.data.balance);
          setUser(response.data.user);


        }
      } catch (error) {
        console.error("Error fetching balance:", error.response || error.message || error);
        setError("Error fetching balance.");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <AppBar user={user}>
        <span className="text-black font-semibold mx-2">
          Hello, {user && (user.firstName || user.name || user.username) ? (user.firstName || user.name || user.username) : "User"}
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <>
            <Balance value={balance} />
            <QuickActions />
            <TransactionsPreview />
            <Analytics />
            <Users />
          </>
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
      />
    </div>
  );
};

export default Dashboard;
