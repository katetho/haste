const express = require('express');
const cards = express();
const Ticket = require('../models/Ticket')
const path = require('path');
const distributeItems = require('../helperFunctions').distribute;

cards.set('views', path.join(__dirname, '../public/views'));

cards.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        distributeItems(tickets);
				res.render('home', {title: 'Tickets', tickets:tickets});
    } catch (err) {
        res.render('err');
    }
})

module.exports = cards;
