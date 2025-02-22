import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setUser(response.data.user);
        setBalance(response.data.balance);
      })
      .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, balance, setBalance }}>
      {children}
    </UserContext.Provider>
  );
};
