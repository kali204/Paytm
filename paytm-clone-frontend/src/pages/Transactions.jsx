import { useEffect, useState, useContext } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Transactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/transactions/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((response) => setTransactions(response.data.transactions))
      .catch((error) => console.error("Error fetching transactions:", error));
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Transaction History</Typography>
        {transactions.length === 0 ? (
          <Typography>No transactions found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sender</TableCell>
                  <TableCell>Receiver</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.transaction_id}>
                    <TableCell>{txn.sender_name}</TableCell>
                    <TableCell>{txn.receiver_name}</TableCell>
                    <TableCell>₹{txn.amount}</TableCell>
                    <TableCell>{txn.status === "successful" ? "✅ Successful" : "❌ Failed"}</TableCell>
                    <TableCell>{new Date(txn.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Transactions;
