const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const auth = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log('Decoded User:', req.user); // Log the decoded user
        next();
    } catch (err) {
        console.error('Token verification error:', err); // Log the error
        res.status(403).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
