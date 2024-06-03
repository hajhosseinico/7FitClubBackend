const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

// Get calendar events
router.get('/', auth, (req, res) => {
    const sql = 'SELECT * FROM trainers_calendar';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add calendar event (admin only)
router.post('/', auth, (req, res) => {
    if (req.user.userType !== 'admin') return res.status(403).json({ msg: 'Admin resources, access denied' });
    const { live_video_link, trainer_name, time_date, title, trainer_image, background_color } = req.body;
    const sql = 'INSERT INTO trainers_calendar (live_video_link, trainer_name, time_date, title, trainer_image, background_color) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [live_video_link, trainer_name, time_date, title, trainer_image, background_color], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId });
    });
});

// Update calendar event (admin only)
router.put('/:id', auth, (req, res) => {
    if (req.user.userType !== 'admin') return res.status(403).json({ msg: 'Admin resources, access denied' });
    const { live_video_link, trainer_name, time_date, title, trainer_image, background_color } = req.body;
    const sql = 'UPDATE trainers_calendar SET live_video_link = ?, trainer_name = ?, time_date = ?, title = ?, trainer_image = ?, background_color = ? WHERE id = ?';
    db.query(sql, [live_video_link, trainer_name, time_date, title, trainer_image, background_color, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ msg: 'Event updated' });
    });
});

// Delete calendar event (admin only)
router.delete('/:id', auth, (req, res) => {
    if (req.user.userType !== 'admin') return res.status(403).json({ msg: 'Admin resources, access denied' });
    const sql = 'DELETE FROM trainers_calendar WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ msg: 'Event deleted' });
    });
});

module.exports = router;
