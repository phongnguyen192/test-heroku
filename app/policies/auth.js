'use strict';
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cache = require('../middleware/cache');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

function generateToken(user) {
    const userInfo = {
        id: '123' + user.LastName,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        roles: user.ExtendedAttributesJson
    };
    const token = jwt.sign(userInfo, config.secretKey, { expiresIn: '1h' });
    return token;
}

module.exports = {

    validateToken: (req, res, next) => {
        if (req.path == '/authenticate' || req.path == '/token') {
            return next();
        }
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token;
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err)
                    return res.status(500).send({ Error: err });
                req.currentUser = decoded;
                const result = cache.get(decoded.lastName);
                if (!result)
                    return res.status(401).json({ Error: 'The access token provided is expired' });
                next();
            });
        } else {
            res.status(401).json({ Error: 'Invalid Token' });
        }
    },

    authenticate: (req, res, next) => {
        let url = config.cgiUrl + 'token';
        axios.post(url, {
            retrieversecret: config.secretKey,
            token: req.body.token
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.ErrorMessage.length > 0) {
                    res.status(500).json({ Error: response.data.ErrorMessage });
                } else {
                    const profile = JSON.parse(response.data.JsonUserProfile);
                    const token = generateToken(profile);
                    req.userInfo = profile;
                    cache.set(profile.LastName, profile);
                    res.status(200).send({ status: "success", data: { token: token } });
                }
            })
            .catch((error) => {
                res.status(500).json({ Error: error });
            })
    },

};