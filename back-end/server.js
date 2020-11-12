const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const mongo = require('./db/connection');
const LoginController = require('./controllers/LoginController');
const AppointmentController = require('./controllers/AppointmentController');
const authentication = require('./controllers/AuthenticationHandler');
const UserController = require('./controllers/UserController');

const app = express();

app.use(bodyParse.json());
app.use(cors());

app.use('/authentication', LoginController);
app.use('/appointment', authentication.verifyToken, AppointmentController);
app.use('/user', authentication.verifyToken, UserController);

app.listen('8080', () => { 
    console.log('Server started on port 8080');
    mongo.connect();
})