const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

const secretKey = 'your_secret_key'; // Change this to a strong secret key

// Middleware to parse JSON
app.use(express.json());

const corsOptions = {
    origin: ['http://7fitclub.com', 'http://www.7fitclub.com', 'http://3.133.158.10'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use CORS middleware

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const calendarRoutes = require('./routes/calendar');

// Use Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Ensure this is correctly registered
app.use('/calendar', calendarRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
