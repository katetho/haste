import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { Session } from '../models/Session';
import { helpers } from '../services/helperFunctions';
import { Request, Response} from 'express';

export const list = async (req: Request, res: Response) => {
    try {
        if (req.query.status === undefined) {
            req.query.status = 'active';
        }
        let tickets: Ticket[] = await Ticket.scope(req.query.status)
            .findAll();
        helpers.ticketHandler(tickets, req);

        res.render('home', {
            title: 'Tickets',
            tickets: tickets
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
}

export const mytickets = async (req: Request, res: Response) => {
    try {
        if (req.query.status === undefined) {
            req.query.status = 'active';
        }
        let tickets: Ticket[] = await Ticket.scope(req.query.status).findAll({
                where: {
                    assigneeID: req.session.userId
                }
            });

        helpers.ticketHandler(tickets, req);
        res.render('home', {
            title: 'Tickets',
            tickets
        });
    } catch (err) {
        console.log(err);
        res.render('home', {
            title: 'Tickets'
        });
    }
}

export const taketicket = async (req: Request, res: Response) => {
    try {
        if (req.query.status === undefined) {
            req.query.status = 'active';
        }
        const sesh: any = await Session.findOne({
            where: {
                sid: req.session.id
            },
            include: [User]
        });
        let userDepartment: string = sesh.User.department;
        let tickets: Ticket[] = await Ticket.scope(req.query.status).findAll({
                where: {
                    department: userDepartment,
                    assignee: null
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

export const outgoing = async (req: Request, res: Response) => {
    try {
        if (req.query.status === undefined) {
            req.query.status = 'active';
        }
        let initiatorId: number = req.session.userId;
        let tickets: Ticket[] = await Ticket.scope(req.query.status).findAll({
                where: {
                    initiatorId
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