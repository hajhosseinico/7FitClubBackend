require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const cors = require('cors');
const app = express();

// Log the SECRET_KEY to verify it's correctly set
console.log('SECRET_KEY:', process.env.SECRET_KEY);

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const calendarRoutes = require('./routes/calendar');
const userRoutes = require('./routes/users');

// Use routes
app.use('/auth', authRoutes);
app.use('/calendar', calendarRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
