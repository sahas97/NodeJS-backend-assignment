const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Authorization header missing!');
        error.statusCode = 401;
        throw error
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        const error = new Error('Token not provided!');
        error.statusCode = 401;
        throw error;
    }
    let decodedtoken;
    try {
        decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedtoken) {
        const error = new Error('Invalid token!');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedtoken.userId;
    req.emai = decodedtoken.email;
    //req.type =decodedtoken.type;
    next();
}