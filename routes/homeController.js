const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Session = require('../models/Session')
const path = require('path');
const helpers = require('../middleware/helperFunctions');
const { Op } = require("sequelize");

//MAKE A UNIVERSAL REQ USING req.path and switch cases
export const list = async (req, res) => {
    try {
        let status = [];
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        } else {
            status.push(req.query.status);
        }
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
            tickets
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
}

export const mytickets = async (req, res) => {
    try {
        let status;
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        } else {
            status = req.query.status;
        }
        let tickets = await Ticket.findAll({
            where: {
                assigneeID: req.session.userId,
                status
            }
        });
        helpers.ticketHandler(tickets, req);
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
}

export const taketicket = async (req, res) => {
    try {
        let status;
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        } else {
            status = req.query.status;
        }
        const sesh = await Session.findOne({
            where: {
                sid: req.session.id
            },
            include: User
        });
        let userDepartment = sesh.user.department;
        let tickets = await Ticket.findAll({
            where: {
                department: userDepartment,
                assignee: null,
                status
            }
        });
        helpers.ticketHandler(tickets, req);
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
}

export const outgoing = async (req, res) => {
    try {
        let status;
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        } else {
            status = req.query.status;
        }
        let initiatorId = req.session.userId;
        let tickets = await Ticket.findAll({
            where: {
                initiatorId,
                status
            }
        });
        helpers.ticketHandler(tickets, req);
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
}
