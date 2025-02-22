import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SendMoney = () => {
  const { user } = useContext(AuthContext);
  const [receiverPhone, setReceiverPhone] = useState("");
  const [amount, setAmount] = useState("");

  const handleSendMoney = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send_money",
        {
          sender_id: user?.id, // Ensure sender_id is sent correctly
          receiver_phone: receiverPhone.trim(), // Trim spaces
          amount: parseFloat(amount), // Ensure amount is a float
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.error || "Transaction failed. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <Typography variant="h4" gutterBottom>
          Send Money
        </Typography>
        <TextField
          fullWidth
          label="Receiver's Phone"
          margin="normal"
          variant="outlined"
          value={receiverPhone}
          onChange={(e) => setReceiverPhone(e.target.value)}
        />
        <TextField
          fullWidth
          label="Amount"
          margin="normal"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendMoney}
        >
          Send Money
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default SendMoney;
