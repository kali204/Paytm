import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setPhone(phoneNumber);
    if (phoneNumber.length === 10) {
      setUpiId(`${phoneNumber}@paytmclone`);
    } else {
      setUpiId("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        phone,
        upi_id: upiId,
        password,
      });
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert("Error in Registration");
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
          <TextField fullWidth label="Phone" margin="normal" variant="outlined" value={phone} onChange={handlePhoneChange} />
          <TextField fullWidth label="UPI ID" margin="normal" variant="outlined" value={upiId} disabled />
          <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
