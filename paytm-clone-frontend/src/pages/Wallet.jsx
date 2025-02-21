import { Container, Typography } from "@mui/material";

const Wallet = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Wallet</Typography>
      <Typography variant="h6">Manage your funds securely</Typography>
    </Container>
  );
};

export default Wallet;
