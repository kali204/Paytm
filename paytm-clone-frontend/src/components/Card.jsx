import { Card as MuiCard, CardContent, Typography } from "@mui/material";

const Card = ({ title, content }) => {
  return (
    <MuiCard sx={{ margin: "20px", padding: "20px", textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
