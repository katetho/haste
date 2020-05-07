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
const User_1 = require("../models/User");
const Session_1 = require("../models/Session");
const helperFunctions_1 = require("../services/helperFunctions");
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.session.userId + "!!!!");
        res.json(yield helperFunctions_1.helpers.displayTickets(req.query.status, req));
    }
    catch (err) {
        res.json(err);
    }
});
exports.mytickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield helperFunctions_1.helpers.displayTickets(req.query.status, req, {
            where: {
                assigneeID: req.session.userId
            }
        }));
    }
    catch (err) {
        res.json(err);
    }
});
exports.taketicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sesh = yield Session_1.Session.findOne({
            where: {
                sid: req.session.id
            },
            include: [User_1.User]
        });
        let userDepartment = sesh.User.department;
        res.json(yield helperFunctions_1.helpers.displayTickets(req.query.status, req, {
            where: {
                department: userDepartment,
                assignee: null
            }
        }));
    }
    catch (err) {
        res.json(err);
    }
});
exports.outgoing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield helperFunctions_1.helpers.displayTickets(req.query.status, req, {
            where: {
                initiatorId: req.session.userId
            }
        }));
    }
    catch (err) {
        res.json(err);
    }
});
//# sourceMappingURL=homeController.js.map