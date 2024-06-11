const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db'); // Database connection

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

            // Generate plain text token
            const tokenPayload = { phonenumber: user.phonenumber, userType: user.userType };
            const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');
            console.log('Login successful, token generated:', token);
            res.json({ token });
        });
    });
});

module.exports = router;
