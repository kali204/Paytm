const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // Ensure this path points to your database connection

const Transaction = sequelize.define('Transaction', {
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Success', 'Failed', 'Pending']],
        },
    },
});

module.exports = { Transaction };
