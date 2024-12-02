const { Sequelize } = require('sequelize');

// Initialize Sequelize with database details
const sequelize = new Sequelize('payment_system', 'root', '1947', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres'
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error connecting to the database:', err));

module.exports = sequelize;
