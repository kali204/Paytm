import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Payment from './components/Payment';
import TransactionHistory from './components/TransactionHistory';
import FailedTransactions from './components/FailedTransactions';

const App = () => {
    // Shared state for transaction history
    const [transactions, setTransactions] = useState([]);
    const [failedTransactions, setFailedTransactions] = useState([]);

    // Function to add a successful transaction
    const addTransaction = (transaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    };

    // Function to add a failed transaction
    const addFailedTransaction = (transaction) => {
        setFailedTransactions((prevFailed) => [...prevFailed, transaction]);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/payment" 
                    element={<Payment addTransaction={addTransaction} addFailedTransaction={addFailedTransaction} />} 
                />
                <Route 
                    path="/history" 
                    element={<TransactionHistory transactions={transactions} />} 
                />
                <Route 
                    path="/failed" 
                    element={<FailedTransactions failedTransactions={failedTransactions} />} 
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
