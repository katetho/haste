"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const path = require('path');
const helpers = require('../middleware/helperFunctions');
const { Op } = require("sequelize");
exports.getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try { //status - show all, but closed tickets
        let status = ["assigned", "unassigned", "active"];
        const tickets = yield Ticket.findAll({
            where: {
                status: {
                    [Op.or]: status
                }
            }
        });
        res.json(tickets);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.postTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = ["assigned", "unassigned", "active"];
        let initiatorId = req.session.userId;
        const ticket = yield Ticket.create({
            title: req.body.title,
            department: req.body.department,
            priority: req.body.priority,
            deadline: req.body.deadline,
            description: req.body.description,
            initiatorId
        });
        const tickets = yield Ticket.findAll({
            where: {
                status: {
                    [Op.or]: status
                }
            }
        });
        helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets: tickets,
            layout: false
        });
    }
    catch (err) {
        res.json({
            message: err
        });
        console.log(err);
    }
});
exports.findTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield Ticket.findByPk(req.params.ticketId);
        res.json(ticket);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Ticket.destroy({
            where: {
                id: req.params.ticketId
            }
        });
        const tickets = yield Ticket.findAll();
        res.json(tickets);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.closeTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ticketId = req.body.ticketId;
        let replacement = {};
        if (req.body.action === 'drop') {
            replacement = {
                assignee: null,
                assigneeID: null,
                status: 'unassigned'
            };
        }
        else {
            replacement = {
                status: 'closed'
            };
        }
        let updatedTicket = yield Ticket.update(replacement, {
            where: {
                id: ticketId
            }
        });
        let status = ["assigned", "unassigned", "active"];
        const tickets = yield Ticket.findAll({
            where: {
                status: {
                    [Op.or]: status
                }
            }
        });
        helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets: tickets,
            layout: false
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
//take ticket
exports.takeTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decodedID = req.params.ticketId;
        const currentUser = yield User.findByPk(req.session.userId);
        let fullname = currentUser.firstName + ' ' + currentUser.lastName;
        const replacement = {
            assigneeID: req.session.userId,
            assignee: fullname,
            status: 'assigned'
        };
        const updatedTicket = yield Ticket.update(replacement, {
            where: {
                id: decodedID
            }
        });
        res.json(updatedTicket);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
//# sourceMappingURL=ticketsController.js.map