import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const FailedTransactions = ({ failedTransactions }) => (
    <div style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
            Failed Transactions
        </Typography>
        {failedTransactions.length > 0 ? (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Receiver</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {failedTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.sender}</TableCell>
                            <TableCell>{transaction.receiver}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{transaction.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                No failed transactions yet.
            </Typography>
        )}
    </div>
);

export default FailedTransactions;
