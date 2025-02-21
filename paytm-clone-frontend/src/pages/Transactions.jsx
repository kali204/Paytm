import { useContext } from "react";
import { Container, Typography, List } from "@mui/material";
import { UserContext } from "../context/UserContext";
import TransactionItem from "../components/TransactionItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Transactions = () => {
  const { transactions } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>Transaction History</Typography>
        <List>
          {transactions.map((txn, index) => (
            <TransactionItem key={index} transaction={txn} />
          ))}
        </List>
      </Container>
      <Footer />
    </>
  );
};

export default Transactions;
