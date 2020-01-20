const express = require('express');
const cards = express();
const Ticket = require('../models/Ticket')
const exphbrs = require('express-handlebars');
const path = require('path');

cards.set('views', path.join(__dirname, '../public/views'));
cards.engine('hbs', exphbrs({defaultLayout: 'main.hbs'}));
cards.set('view engine', 'hbs');

cards.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
				let ticketsArr = [...tickets];
				ticketsArr[0].openDiv=true;
				let mid = Math.floor(ticketsArr.length/2);
				ticketsArr[mid].closeDiv=true;
				ticketsArr[mid+1].openDiv=true;
				ticketsArr[ticketsArr.length-1].closeDiv=true;
				res.render('home', {title: 'Tickets', tickets:ticketsArr});
    } catch (err) {
        res.json({
            message: err
        });
    }
})

module.exports = cards;
