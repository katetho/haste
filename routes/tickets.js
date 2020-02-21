const express = require('express');
const router = express.Router();
const Base64 = require('js-base64').Base64;
const Ticket = require('../models/Ticket')
const path = require('path');
const helpers = require('../middleware/helperFunctions');

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.json(tickets);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.post('/', async (req, res) => {
    const ticket = new Ticket({
        title: req.body.title,
        department: req.body.department,
        priority: req.body.priority,
        deadline: req.body.deadline,
        description: req.body.description
    });
    try {
        const savedTicket = await ticket.save();
        const tickets = await Ticket.find()
        helpers.ticketHandler(tickets);
        res.render('home', {
            title: 'Tickets',
            tickets: tickets,
            layout: false
        });
    } catch (err) {
        res.json({
            message: err
        })
        console.log(err);
    }
});

router.get('/:ticketId', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);
        res.json(ticket);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.delete('/:ticketId', async (req, res) => {
    try {
        const ticketToRemove = await Ticket.deleteOne({
            _id: req.params.ticketId
        })
        const tickets = await Ticket.find()
        res.json(tickets);
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.patch('/:ticketId', async (req, res) => {
    try {
        let decodedID = Base64.decode(req.params.ticketId);
        const filter = {
            _id: decodedID
        };
        const updatedTicket = await Ticket.updateOne(filter, {
            //add editable description, title and deadline
            assignee: req.body.assignee //when a person hits 'take'
        })
        res.json(updatedTicket)
    } catch (err) {
        res.json({
            message: err
        })
    }
})
module.exports = router;
