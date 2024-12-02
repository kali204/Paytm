import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Payment System
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/payment">Make Payment</Button>
            <Button color="inherit" component={Link} to="/history">Transaction History</Button>
            <Button color="inherit" component={Link} to="/failed">Failed Transactions</Button>
        </Toolbar>
    </AppBar>
);

export default Navbar;
