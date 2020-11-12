const config = require('../config.json');
const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
    const userToken = req.headers['authorization'];
    if(!userToken)
        return res.status(401).json({ error: 'Please provide valid authorization token' });
    jwt.verify(userToken, config.jwt_key, (err, decodedTokenData) => {
        if(err)
            return res.status(401).json({ error: 'Please provide valid authorization token' });
        req.user = decodedTokenData;
        next();
    })
}

module.exports = {
    verifyToken: verifyToken
}