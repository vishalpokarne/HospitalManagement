const express = require('express');
var router = express.Router();
const User = require('../models/User');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.find({ username: username  })
    .then(user => {
        if(user.length === 0)
            return res.status(404).json({ message: "No user found" })
        if(user.length === 1){
            if(user[0].hashedPassword !== password)
                return res.status(401).json({ message: "Unauthorised access." });
            const userData = {
                _id: user[0]._id,
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                type: user[0].type,
                username: user[0].username,
                email: user[0].email
            }
            jwt.sign(userData, config.jwt_key, { expiresIn: 86400 }, function(err, token) {
                if(err)
                    return res.status(500).json({ message: 'Error in creating token' });
                console.log("Login successful");
                return res.status(200).json({ message:"login successful", token: token });
            });
        }
        if(user.length > 1){
            console.log(user)
            console.log("Something bad happened, more users registered ");
            return res.status(400).json({ message: "Account blocked, please create new with different username and email" });
        }
    })
    .catch(err => {
        return res.status(400).json({ message: err });
    })
})

router.post('/register', (req, res) => {
    const { firstname, lastname, type, username, email, hashedPassword } = req.body;
    if(!firstname || !lastname || !type || !username || !email || !hashedPassword)
        return res.status(400).json({ message: 'Please provide correct information' });
    let user = new User({
        firstname: firstname,
        lastname: lastname,
        type: type,
        username: username,
        email: email,
        hashedPassword: hashedPassword
    })

    user.save()
        .then(savedUser => {
            console.log("New user created!");
            const userData = {
                _id: savedUser._id,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                type: savedUser.type,
                username: savedUser.username,
                email: savedUser.email
            }
            jwt.sign(userData, config.jwt_key, { expiresIn: 86400 }, function(err, token) {
                if(err)
                    return res.status(500).json({ message: 'Error in creating token' });
                return res.status(201).json({ message: 'New user created!', token: token });
            });
        })
        .catch(err => {
            return res.status(400).json({ message:err });
        })
})

router.get('/all', (req, res) => {
    User.find({})
            .then(response => {
                res.json(response);
            })
            .catch(err => console.log(err))
})



module.exports = router;