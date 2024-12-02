import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Paper } from '@mui/material';

const TransactionHistory = ({ transactions = [] }) => (
    <Box sx={{ padding: '2rem', maxWidth: 800, margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
            Transaction History
        </Typography>

        {transactions.length > 0 ? (
            <Paper sx={{ overflowX: 'auto', borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Sender</strong></TableCell>
                            <TableCell><strong>Receiver</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.sender}</TableCell>
                                <TableCell>{transaction.receiver}</TableCell>
                                <TableCell>${transaction.amount}</TableCell>
                                <TableCell>{transaction.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        ) : (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                No transactions to display.
            </Typography>
        )}
    </Box>
);

export default TransactionHistory;
