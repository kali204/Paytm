import { Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Container sx={{ textAlign: "center", marginTop: "50px", padding: "20px 0", borderTop: "1px solid #ddd" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Paytm Clone. All Rights Reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
