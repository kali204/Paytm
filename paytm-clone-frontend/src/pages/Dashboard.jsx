import { useContext } from "react";
import { Container, Typography, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { balance } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="h6" gutterBottom>Current Balance: {formatCurrency(balance)}</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate("/transactions")}>
          View Transactions
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
