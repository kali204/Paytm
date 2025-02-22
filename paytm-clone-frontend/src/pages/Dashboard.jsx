import { useContext, useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(UserContext); // Ensure user is available
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/balance/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((response) => setBalance(response.data.balance))
      .catch((error) => console.error("Error fetching balance:", error));
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="h6" gutterBottom>
          Current Balance: {formatCurrency(balance)}
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate("/transactions")} style={{ marginRight: "10px" }}>
          View Transactions
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate("/send-money")}>
          Send Money
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
