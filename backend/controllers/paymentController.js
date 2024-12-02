const Transaction = require('../models/Transaction');

// Create a payment
const createPayment = async (req, res) => {
    const { sender, receiver, amount } = req.body;

    try {
        // Simulate payment gateway logic
        const success = Math.random() > 0.5; // Randomly simulate success/failure

        // Create a transaction in the database
        const transaction = await Transaction.create({
            sender,
            receiver,
            amount,
            status: success ? 'Success' : 'Failed',
        });

        res.status(201).json({ message: success ? 'Payment successful' : 'Payment failed', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get successful transactions
const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { status: 'Success' } });
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get failed transactions
const getFailedTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { status: 'Failed' } });
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createPayment, getTransactionHistory, getFailedTransactions };
