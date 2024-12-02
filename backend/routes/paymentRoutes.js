const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
const { Transaction } = require('../models/Transaction'); // Adjust path as needed

// Initialize Stripe with your secret key
const stripe = Stripe('your-stripe-secret-key'); // Replace with your Stripe Secret Key

// Get all transactions
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json({
            success: true,
            data: transactions
        });
    } catch (error) {
        console.error('Error fetching transactions: ', error.message);
        res.status(500).json({ success: false, message: 'Error fetching transactions' });
    }
});

// Create a new payment
router.post('/payments', async (req, res) => {
    try {
        const { sender, receiver, amount } = req.body;

        // Input validation
        if (!sender || !receiver || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Sender, receiver, and amount are required'
            });
        }

        // Simulate payment status (80% success rate)
        const isSuccess = Math.random() > 0.2;  // 80% chance of success
        const status = isSuccess ? 'Success' : 'Failed';

        // Create the transaction
        const transaction = await Transaction.create({
            sender,
            receiver,
            amount,
            status
        });

        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        console.error('Error creating payment: ', error.message);
        res.status(500).json({ success: false, message: 'Error creating payment' });
    }
});

// Get failed transactions
router.get('/failed-transactions', async (req, res) => {
    try {
        const failedTransactions = await Transaction.findAll({
            where: { status: 'Failed' }
        });
        res.status(200).json({
            success: true,
            data: failedTransactions
        });
    } catch (error) {
        console.error('Error fetching failed transactions: ', error.message);
        res.status(500).json({ success: false, message: 'Error fetching failed transactions' });
    }
});

module.exports = router;
