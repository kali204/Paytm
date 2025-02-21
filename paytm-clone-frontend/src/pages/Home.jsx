import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h3" gutterBottom>Welcome to Paytm Clone</Typography>
        <Typography variant="h6" paragraph>
          A secure and fast way to manage your transactions.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
          Get Started
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
