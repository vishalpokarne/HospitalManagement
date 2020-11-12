const express = require('express');
var router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.get('/all/:userEmail', async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const userType = await User.find({ email: req.params.userEmail });
    const query = userType[0].type.toLowerCase() === 'doctor' ? { } : { createdBy: req.params.userEmail }
    const totalPages = Math.ceil((await Appointment.find(query)).length / limit);
    Appointment.find(query).limit(limit * 1).skip((page - 1) * limit).exec()
    .then(appointment => {
        return res.status(200).json({ appointments: appointment, totalPages:totalPages, pageNo: parseInt(page), size: appointment.length })
    })
    .catch(err => {
        return res.status(400).json({ message: err });
    })
})

router.get('/get/:appointmentId', (req, res) => {
    Appointment.find({ _id: req.params.appointmentId })
    .then(appointment => {
        if(appointment.length === 0)
            return res.status(404).json({ message: "No appointments found" })
        return res.status(200).json({ appointments: appointment })
    })
    .catch(err => {
        return res.status(400).json({ message: err });
    })
})

router.put('/create', (req, res) => {
    const { date, createdAt, createdBy, name, email } = req.body;

    if(!date || !createdAt || !createdBy || !name|| !email)
        return res.status(400).json({ message: 'Please provide correct information' });
    let appointment = new Appointment({
        date: date,
        createdAt: createdAt,
        createdBy: createdBy,
        name: name,
        email: email
    })

    appointment.save()
        .then(savedAppointment => {
            console.log("New appointment created!");
            return res.status(201).json({ message: 'New appointment created!', appointments: savedAppointment });
        })
        .catch(err => {
            return res.status(400).json({ message: err });
        })
})

router.delete('/delete/:appointmentId', (req, res) => {
    Appointment.findByIdAndDelete({ _id: req.params.appointmentId })
        .then(async deletedAppointment => {
            console.log(`Deleted appointment ID: ${deletedAppointment._id}`);
            const { page = 1, limit = 5 } = req.query;
            let allAppointment = await Appointment.find({ }).limit(limit * 1).skip((page - 1) * limit).exec()
            return res.status(200).json({ message: 'Appointment deleted successfully', appointments: allAppointment });
        })
        .catch(err => {
            return res.status(400).json({ message: err });
        })
})

router.patch('/update/:appointmentId', (req, res) => {
    Appointment.findByIdAndUpdate({ _id: req.params.appointmentId}, req.body)
        .then(async oldAppointment => {
            console.log(`Updated appointment ID: ${req.params.appointmentId}`);
            let updatedAppointment = await Appointment.findById({ _id: req.params.appointmentId });
            return res.status(200).json({ message: 'Appointment updated successfully', user: updatedAppointment});
        })
        .catch(err => {
            return res.status(400).json({ message: err });
        })
})

module.exports = router;
