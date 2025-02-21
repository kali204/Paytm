import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Fetch user balance
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/balance", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setBalance(response.data.balance))
        .catch(() => setBalance(0));
    }
  }, [token]);

  // Fetch transactions
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/transactions", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setTransactions(response.data.transactions))
        .catch(() => setTransactions([]));
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ balance, transactions }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
