import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        phone,
        password,
      });

      // Save token & user info after successful registration
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);

      alert("Registration Successful! Your UPI ID: " + response.data.upi_id);
      navigate("/dashboard");  // Redirect to Dashboard immediately
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleRegister}>
          <TextField fullWidth label="Name" margin="normal" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Phone" margin="normal" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
