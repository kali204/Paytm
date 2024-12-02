import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Payment = ({ addTransaction, addFailedTransaction }) => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle payment and add transaction to history
    const handlePayment = () => {
        if (!sender || !receiver || !amount) {
            setErrorMessage('All fields are required!');
            setSuccessMessage('');
            return;
        }

        // Prepare transaction data
        const transactionData = {
            sender,
            receiver,
            amount,
            status: 'Pending',  // Set initial status to Pending
        };

        // Call the backend API to process the payment
        axios
    .post('http://localhost:5000/api/payments', transactionData) // Use full route if prefix exists
    .then((response) => {
        console.log('Response:', response.data);
        const newTransaction = response.data.data;
        if (newTransaction.status === 'Success') {
            addTransaction(newTransaction);
            setSuccessMessage('Payment Successful!');
        } else {
            addFailedTransaction(newTransaction);
            setErrorMessage('Payment Failed! Try again.');
        }
        setSender('');
        setReceiver('');
        setAmount('');
    })
    .catch((error) => {
        console.error('Error response:', error.response);
        setErrorMessage(error.response?.data?.message || 'Error processing payment. Please try again.');
        setSuccessMessage('');
    });

    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Make a Payment
            </Typography>
            <TextField
                fullWidth
                label="Sender"
                margin="normal"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
            />
            <TextField
                fullWidth
                label="Receiver"
                margin="normal"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <TextField
                fullWidth
                label="Amount"
                margin="normal"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handlePayment}
            >
                Proceed
            </Button>
            {successMessage && (
                <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
                    {successMessage}
                </Typography>
            )}
            {errorMessage && (
                <Typography variant="body1" color="error.main" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default Payment;
