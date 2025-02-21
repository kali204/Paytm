import { ListItem, ListItemText, Chip } from "@mui/material";

const TransactionItem = ({ transaction }) => {
  return (
    <ListItem>
      <ListItemText
        primary={`₹${transaction.amount} - ${transaction.transaction_type.toUpperCase()}`}
        secondary={`Status: ${transaction.status} | Date: ${new Date(transaction.created_at).toLocaleString()}`}
      />
      <Chip
        label={transaction.status}
        color={transaction.status === "successful" ? "success" : transaction.status === "pending" ? "warning" : "error"}
      />
    </ListItem>
  );
};

export default TransactionItem;
