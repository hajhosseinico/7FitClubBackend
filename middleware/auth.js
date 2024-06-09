const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Ensure this matches the secret used when generating the token

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded); // Log the decoded token
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
