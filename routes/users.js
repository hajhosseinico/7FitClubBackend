const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get user info
router.get('/me', auth, (req, res) => {
    const sql = 'SELECT phonenumber, name, email, userType FROM users WHERE phonenumber = ?';
    db.query(sql, [req.user.phonenumber], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

module.exports = router;
