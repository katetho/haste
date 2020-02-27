const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/Ticket')
const path = require('path');
const helpers = require('../middleware/helperFunctions');


router.get('/', helpers.redirectSignin, async (req, res) => {
    try {
      let status;
      if(req.query.status===undefined||req.query.status==='active') {
        status=/^(?:assigned|unassigned|active)$/;
      }
      else {
        status=req.query.status;
      }
        const tickets = await Ticket.find({status});
        helpers.ticketHandler(tickets,req);
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
      let status;
      if(req.query.status===undefined||req.query.status==='active') {
        status=/^(?:assigned|unassigned|active)$/;
      }
      else {
        status=req.query.status;
      }
        let currentUser = req.session.user.firstName + ' ' + req.session.user.lastName;
        let tickets = await User.find({
            assignee: currentUser,
            status
        });
        helpers.ticketHandler(tickets,req);
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
        let status;
        if(req.query.status===undefined||req.query.status==='active') {
          status=/^(?:assigned|unassigned|active)$/;
        }
        else {
          status=req.query.status;
        }
        let userDepartment = req.session.user.department;
        let tickets = await User.find({
            department: userDepartment,
            assignee:undefined,
            status
        });
        helpers.ticketHandler(tickets,req);
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

router.get('/outgoing', helpers.redirectSignin, async (req, res) => {
    try {
      let status;
      if(req.query.status===undefined||req.query.status==='active') {
        status=/^(?:assigned|unassigned|active)$/;
      }
      else {
        status=req.query.status;
      }
        let initiator = req.session.user._id;
        let tickets = await User.find({
            initiator,
            status
        });
        helpers.ticketHandler(tickets,req);
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
