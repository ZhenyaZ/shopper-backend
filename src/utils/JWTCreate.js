const jwt  = require('jsonwebtoken');

const JWTCreate = (data) => {
    return jwt.sign(data, process.env.JWT_KEY, {expiresIn: '1000d'})
}

module.exports = JWTCreate