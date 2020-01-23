const express = require('express');
const cards = express();
const Ticket = require('../models/Ticket')
const path = require('path');

cards.set('views', path.join(__dirname, '../public/views'));

cards.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        if(tickets.length>=2){
          tickets[0].openDiv=true;
  				let mid = Math.round(tickets.length/2);
  				tickets[mid-1].closeDiv=true;
  				tickets[mid].openDiv=true;
  				tickets[tickets.length-1].closeDiv=true;
          tickets.forEach((item, i, arr)=>{
            arr[i].deadlineUI = item.deadline.toLocaleString();
          })
        }
        else {
            tickets[0].openDiv=true;
            tickets[0].closeDiv=true;
        }
				res.render('home', {title: 'Tickets', tickets:tickets});
    } catch (err) {
        res.render('home');
    }
})

module.exports = cards;
