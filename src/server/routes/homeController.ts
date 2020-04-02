import { User } from '../models/User';
import { Session } from '../models/Session';
import { helpers } from '../services/helperFunctions';
import { Request, Response} from 'express';

export const list = async (req: Request, res: Response) => {
    try {
        res.render('home', {
            title: 'Tickets',
            tickets: await helpers.ticketStatus(req.query.status, req)
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
        res.render('home', {
            title: 'Tickets',
            tickets: await helpers.ticketStatus(req.query.status, req, {
                where: {
                    assigneeID: req.session.userId
                }
            })
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
        const sesh: any = await Session.findOne({
            where: {
                sid: req.session.id
            },
            include: [User]
        });
        let userDepartment: string = sesh.User.department;
        res.render('home', {
            title: 'Tickets',
            tickets: await helpers.ticketStatus(req.query.status, req, {
                    where: {
                        department: userDepartment,
                        assignee: null
                    }
                })
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
        res.render('home', {
            title: 'Tickets',
            tickets: await helpers.ticketStatus(req.query.status, req, {
                where: {
                    initiatorId: req.session.userId
                }
            })
        });
    } catch (err) {
        res.render('home', {
            title: 'Tickets'
        });
        console.log(err);
    }
}