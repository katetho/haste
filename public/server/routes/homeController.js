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
const Ticket_1 = require("../models/Ticket");
const User_1 = require("../models/User");
const Session_1 = require("../models/Session");
const helperFunctions_1 = require("../middleware/helperFunctions");
const sequelize_1 = require("sequelize");
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = [];
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        }
        else {
            status.push(req.query.status);
        }
        const tickets = yield Ticket_1.Ticket.findAll({
            where: {
                status: {
                    [sequelize_1.Op.or]: status
                }
            }
        });
        helperFunctions_1.helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    }
    catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
});
exports.mytickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status;
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        }
        else {
            status = req.query.status;
        }
        const tickets = yield Ticket_1.Ticket.findAll({
            where: {
                assigneeID: req.session.userId,
                status
            }
        });
        helperFunctions_1.helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    }
    catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
});
exports.taketicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status;
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        }
        else {
            status = req.query.status;
        }
        const sesh = yield Session_1.Session.findOne({
            where: {
                sid: req.session.id
            },
            include: [User_1.User]
        });
        let userDepartment = sesh.user.department;
        const tickets = yield Ticket_1.Ticket.findAll({
            where: {
                department: userDepartment,
                assignee: null,
                status
            }
        });
        helperFunctions_1.helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    }
    catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
});
exports.outgoing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status;
        if (req.query.status === undefined || req.query.status === 'active') {
            status = ["assigned", "unassigned", "active"];
        }
        else {
            status = req.query.status;
        }
        let initiatorId = req.session.userId;
        let tickets = yield Ticket_1.Ticket.findAll({
            where: {
                initiatorId,
                status
            }
        });
        helperFunctions_1.helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    }
    catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
});
//# sourceMappingURL=homeController.js.map