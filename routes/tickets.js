const express = require('express');
const router = express.Router();
const Base64 = require('js-base64').Base64;
const Ticket = require('../models/Ticket')
const path = require('path');
const helpers = require('../middleware/helperFunctions');

router.get('/', async (req, res) => {
    try { //status - show all, but closed tickets after creating a new ticket
        let status = /^(?:assigned|unassigned|active)$/;
        const tickets = await Ticket.find({
            status
        })
        res.json(tickets);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.post('/', async (req, res) => {
    try {
        let initiator = req.session.user._id;
        const ticket = new Ticket({
            title: req.body.title,
            department: req.body.department,
            priority: req.body.priority,
            deadline: req.body.deadline,
            description: req.body.description,
            initiator
        });
        const savedTicket = await ticket.save();
        let tickets = await Ticket.find();
        helpers.ticketHandler(tickets, req);
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

router.patch('/close', async (req, res) => {
    try {
        let ticketId = Base64.decode(req.body.ticketId);
        let replacement = {};
        if (req.body.action === 'drop') {
            replacement = {
                assignee: undefined
            }
        } else {
            replacement = {
                status: 'closed'
            }
        }
        const ticketToRemove = await Ticket.findOneAndUpdate({
            _id: ticketId
        }, replacement);
        let status = /^(?:assigned|unassigned|active)$/;
        const tickets = await Ticket.find({
            status
        })
        helpers.ticketHandler(tickets, req);
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
})

router.patch('/:ticketId', async (req, res) => {
    try {
        let decodedID = Base64.decode(req.params.ticketId);
        let fullname = req.session.user.firstName + ' ' + req.session.user.lastName;
        const filter = {
            _id: decodedID
        };
        const updatedTicket = await Ticket.updateOne(filter, {
            //add editable description, title and deadline
            assigneeID: req.session.user._id, //when a person hits 'take'
            assignee: fullname,
            status: 'assigned'
        })
        res.json(updatedTicket)
    } catch (err) {
        res.json({
            message: err
        })
    }
})
module.exports = router;
