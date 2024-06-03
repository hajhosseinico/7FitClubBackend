const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'your_secret_key'; // Change this to a strong secret key

const db = require('../db'); // Database connection

// Registration Route
router.post('/register', (req, res) => {
    const { phonenumber, password, name, email, userType } = req.body;

    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE phonenumber = ?';
    db.query(checkUserQuery, [phonenumber], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;

            // Insert new user
            const insertUserQuery = 'INSERT INTO users (phonenumber, password, name, email, userType) VALUES (?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [phonenumber, hashedPassword, name, email, userType], (err, result) => {
                if (err) throw err;
                res.status(201).json({ msg: 'User registered successfully' });
            });
        });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { phonenumber, password } = req.body;

    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE phonenumber = ?';
    db.query(checkUserQuery, [phonenumber], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign({ id: user.id, userType: user.userType }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

module.exports = router;
