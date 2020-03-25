const express = require('express');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const path = require('path');
const helpers = require('../middleware/helperFunctions');
const { Op } = require("sequelize");

module.exports = {
  getAllTickets: async (req, res) => {
      try { //status - show all, but closed tickets
          let status = ["assigned", "unassigned", "active"];
          const tickets = await Ticket.findAll({
              where: {
                  status: {
                      [Op.or]: status
                  }
              }
          })
          res.json(tickets);
      } catch (err) {
          res.json({
              message: err
          });
      }
  },
  postTicket: async (req, res) => {
      try {
          let status = ["assigned", "unassigned", "active"];
          let initiatorId = req.session.userId;
          const ticket = await Ticket.create({
              title: req.body.title,
              department: req.body.department,
              priority: req.body.priority,
              deadline: req.body.deadline,
              description: req.body.description,
              initiatorId
          });
          const tickets = await Ticket.findAll({
              where: {
                  status: {
                      [Op.or]: status
                  }
              }
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
          console.log(err);
      }
  },
  findTicket: async (req, res) => {
      try {
          const ticket = await Ticket.findByPk(req.params.ticketId);
          res.json(ticket);
      } catch (err) {
          res.json({
              message: err
          });
      }
  },
  deleteTicket: async (req, res) => {
      try {
          Ticket.destroy({
            where: {
              id: req.params.ticketId
            }
          })
          const tickets = await Ticket.findAll()
          res.json(tickets);
      } catch (err) {
          res.json({
              message: err
          })
      }
  },
  closeTicket: async (req, res) => {
      try {
          let ticketId = req.body.ticketId;
          let replacement = {};
          if (req.body.action === 'drop') {
              replacement = {
                  assignee: null,
                  assigneeID: null,
                  status: 'unassigned'
              }
          } else {
              replacement = {
                  status: 'closed'
              }
          }
          let updatedTicket = await Ticket.update(replacement, {
              where: {
                  id: ticketId
              }
          });
          status = ["assigned", "unassigned", "active"];
          const tickets = await Ticket.findAll({
              where: {
                  status: {
                      [Op.or]: status
                  }
              }
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
  },
  //take ticket
  takeTicket: async (req, res) => {
      try {
          let decodedID = req.params.ticketId;
          const currentUser = await User.findByPk(req.session.userId);
          let fullname = currentUser.firstName + ' ' + currentUser.lastName;

          const replacement = {
              assigneeID: req.session.userId, //when a person hits 'take'
              assignee: fullname,
              status: 'assigned'
          }
          const updatedTicket = await Ticket.update(replacement, {
              where: {
                  id: decodedID
              }
          })
          res.json(updatedTicket)
      } catch (err) {
          res.json({
              message: err
          })
      }
  }
}
