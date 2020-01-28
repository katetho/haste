const express = require('express');
const cards = express();
const Ticket = require('../models/Ticket')
const path = require('path');
const helperFunctions = require('../middleware/helperFunctions');

cards.set('views', path.join(__dirname, '../public/views'));

cards.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        helperFunctions.distribute(tickets);
        helperFunctions.ticketTime(tickets);
				res.render('home', {title: 'Tickets', tickets:tickets});
    } catch (err) {
        res.render('err');
    }
})

module.exports = cards;
