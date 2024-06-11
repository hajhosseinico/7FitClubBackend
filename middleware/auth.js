const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    // Parse token as plain text
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
        req.user = decoded;
        console.log('Decoded User:', req.user); // Log the decoded user
        next();
    } catch (err) {
        console.error('Token parsing error:', err); // Log the error
        res.status(403).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
