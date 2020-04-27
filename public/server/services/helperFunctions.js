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
exports.helpers = {
    displayTickets: function (status, req, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status === undefined) {
                status = 'active';
            }
            let tickets = yield Ticket_1.Ticket.scope(status)
                .findAll(condition);
            this.ticketHandler(tickets, req);
            return tickets;
        });
    },
    distribute: function (items) {
        if (items.length >= 2) {
            items[0].openDiv = true;
            let mid;
            if (items.length % 2 !== 0) {
                mid = Math.floor(items.length / 2);
            }
            else {
                mid = Math.round(items.length / 2);
            }
            items[mid - 1].closeDiv = true;
            items[mid].openDiv = true;
            items[items.length - 1].closeDiv = true;
        }
        else {
            items[0].openDiv = true;
            items[0].closeDiv = true;
        }
    },
    ticketTime: function (items) {
        items.forEach((item, i, arr) => {
            arr[i].deadlineUI = item.deadline.toLocaleString();
        });
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let timeDif = item.deadline - Date.now();
            timeDif = Math.floor(timeDif / (1000 * 60 * 60 * 24));
            if (timeDif > 0) {
                item.timeLeft = "Time left: " + timeDif + " days";
                if (timeDif == 1) {
                    item.timeLeft = "Time left: 1 day";
                }
            }
            else {
                item.timeLeft = "Ticket has expired";
            }
        }
    },
    encodeIDs: function (items) {
        items.forEach((item) => {
            item.encodedID = item.id;
        });
    },
    statusCheck: function (items, req) {
        items.forEach((item) => {
            if (item.assigneeID == req.session.userId) {
                item.assignedToCurrent = true;
            }
            else {
                item.assignedToCurrent = false;
            }
            if (item.status === 'closed') {
                item.closed = true;
            }
            else {
                item.closed = false;
            }
        });
    },
    ticketHandler: function (items, req) {
        if (items.length > 0) {
            this.distribute(items);
            this.ticketTime(items);
            this.encodeIDs(items);
            this.statusCheck(items, req);
        }
    }
};
//# sourceMappingURL=helperFunctions.js.map