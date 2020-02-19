const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket')
const path = require('path');
const helpers = require('../middleware/helperFunctions');


router.get('/', helpers.redirectSignin, async (req, res) => {
    try {
        const tickets = await Ticket.find();
        helpers.distribute(tickets);
        helpers.ticketTime(tickets);
        helpers.encodeIDs(tickets);
        res.render('home', {
            title: 'Tickets',
            tickets: tickets
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
})

module.exports = router;
