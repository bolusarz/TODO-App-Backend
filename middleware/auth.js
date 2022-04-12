const jwt = require('jsonwebtoken');
const config = require('../startup/config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        req.user = jwt.verify(token, config.jwtPrivateKey);
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}
