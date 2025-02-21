import { Button as MuiButton } from "@mui/material";

const Button = ({ text, onClick, color = "primary", fullWidth = false }) => {
  return (
    <MuiButton variant="contained" color={color} onClick={onClick} fullWidth={fullWidth}>
      {text}
    </MuiButton>
  );
};

export default Button;
