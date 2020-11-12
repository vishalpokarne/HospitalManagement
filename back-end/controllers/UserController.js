const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const User = require('../models/User');

router.patch('/:userId', (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.userId }, req.body)
        .then(async oldData => {
            let updatedUserData = await User.findById({ _id: req.params.userId });
            const tokenizedData = {
                _id: updatedUserData._id,
                firstname: updatedUserData.firstname,
                lastname: updatedUserData.lastname,
                type: updatedUserData.type,
                username: updatedUserData.username,
                email: updatedUserData.email
            }
            jwt.sign(tokenizedData, config.jwt_key, { expiresIn: 86400 }, function(err, token) {
                if(err)
                    return res.status(500).json({ message: 'Error in creating token' });
                console.log(`Updated data of user ID: ${req.params.userId}`);
                return res.status(200).json({ message:"User data updated successfully", token: token });
            });
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ message: err });
        });
})
module.exports = router;