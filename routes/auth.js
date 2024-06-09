const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'your_secret_key'; // Change this to a strong secret key

const db = require('../db'); // Database connection

// Registration Route
router.post('/register', (req, res) => {
    const { phonenumber, password, name, email, userType } = req.body;
    console.log('Register request received:', req.body);

    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE phonenumber = ?';
    db.query(checkUserQuery, [phonenumber], (err, results) => {
        if (err) {
            console.error('Database query error (check user):', err);
            return res.status(500).json({ msg: 'Internal server error' });
        }

        if (results.length > 0) {
            console.log('User already exists:', phonenumber);
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            // Insert new user
            const insertUserQuery = 'INSERT INTO users (phonenumber, password, name, email, userType) VALUES (?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [phonenumber, hashedPassword, name, email, userType], (err, result) => {
                if (err) {
                    console.error('Database query error (insert user):', err);
                    return res.status(500).json({ msg: 'Internal server error' });
                }
                console.log('User registered successfully:', phonenumber);
                res.status(201).json({ msg: 'User registered successfully' });
            });
        });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { phonenumber, password } = req.body;
    console.log('Login request received:', req.body);

    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE phonenumber = ?';
    db.query(checkUserQuery, [phonenumber], (err, results) => {
        if (err) {
            console.error('Database query error (check user):', err);
            return res.status(500).json({ msg: 'Internal server error' });
        }

        if (results.length === 0) {
            console.log('Invalid credentials (user not found):', phonenumber);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (!isMatch) {
                console.log('Invalid credentials (password mismatch):', phonenumber);
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign({ id: user.id, userType: user.userType }, secretKey, { expiresIn: '24h' });
            console.log('Login successful, token generated:', token);
            res.json({ token, userType: user.userType });
        });
    });
});

module.exports = router;
