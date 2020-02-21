const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/Ticket')
const path = require('path');
const helpers = require('../middleware/helperFunctions');


router.get('/', helpers.redirectSignin, async (req, res) => {
    try {
        const tickets = await Ticket.find();
        helpers.ticketHandler(tickets);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
})

router.get('/mytickets', helpers.redirectSignin, async (req, res) => {
    try {
        let currentUser = req.session.user.firstName + ' ' + req.session.user.lastName;
        let tickets = await User.find({
            assignee: currentUser
        });
        helpers.ticketHandler(tickets);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
})

router.get('/taketicket', helpers.redirectSignin, async (req, res) => {
    try {
        let userDepartment = req.session.user.department;
        let tickets = await User.find({
            department: userDepartment
        });
        helpers.ticketHandler(tickets);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
})

module.exports = router;
