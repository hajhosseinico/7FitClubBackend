const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

const secretKey = 'your_secret_key'; // Change this to a strong secret key

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Use cors middleware

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const calendarRoutes = require('./routes/calendar');

// Use Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/calendar', calendarRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
