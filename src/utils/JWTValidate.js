const jwt = require('jsonwebtoken');

const JWTValidate = (token) => {
    return jwt.verify(token, process.env.JWT_KEY)
}

module.exports = JWTValidate