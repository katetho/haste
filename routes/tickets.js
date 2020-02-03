const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket')
const path = require('path');
const helperFunctions = require('../middleware/helperFunctions');

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
        const savedTicket = ticket.save();
        const tickets = await Ticket.find()
        helperFunctions.distribute(tickets);
        helperFunctions.ticketTime(tickets);
        res.render('home', {
            title: 'Tickets',
            tickets: tickets,
            layout: false
        });
    } catch (err) {
        res.json({
            message: err
        })
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
        const updatedTicket = await Ticket.updateOne({
            id: req.params.ticketId,
            title: req.body.title,
            department: req.body.department,
            priority: req.body.priority,
            deadline: req.body.deadline,
            description: req.body.description
        })
        res.json(req.body)
    } catch (err) {
        res.json({
            message: err
        })
    }
})
module.exports = router;
