import  { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./components/Transactions";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && window.location.pathname !== '/dashboard') {
      
      return <Navigate to="/dashboard" />;
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/transactions" element={<Transactions />} />
         
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
