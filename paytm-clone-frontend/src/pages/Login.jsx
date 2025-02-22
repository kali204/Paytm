import { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // Toggle state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });

      // Save token & user info
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);

      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField 
            fullWidth 
            label="Email" 
            margin="normal" 
            variant="outlined" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}  // Toggle between text/password
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        
        <Typography variant="body2" style={{ marginTop: "15px" }}>
          New user?{" "}
          <Link component="button" onClick={() => navigate("/register")} underline="hover">
            Sign up here
          </Link>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
