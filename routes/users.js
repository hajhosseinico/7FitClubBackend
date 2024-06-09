const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get user info
router.get('/me', auth, (req, res) => {
    console.log('User from Token:', req.user); // Log the user extracted from the token
    const sql = 'SELECT phonenumber, name, email, userType FROM users WHERE phonenumber = ?';
    db.query(sql, [req.user.phonenumber], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ msg: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        console.log('Query Results:', results); // Log the query results
        res.json(results[0]);
    });
});

module.exports = router;
