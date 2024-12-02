const express = require('express');
const app = express();
const sequelize = require('./models/db');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes')

// Middleware
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Payment System API!');
});

app.use('/api',paymentRoutes);
// Other routes can go here...

// Start server
const PORT = 5000;
sequelize.sync()
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Database connection error:', err));
