const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
    origin: ['http://7fitclub.com', 'http://www.7fitclub.com', 'http://18.118.119.144'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use CORS middleware
app.use(express.json()); // Middleware to parse JSON

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const calendarRoutes = require('./routes/calendar');

// Use Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/calendar', calendarRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
