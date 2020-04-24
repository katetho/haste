import { User } from '../models/User';
import { Session } from '../models/Session';
import { helpers } from '../services/helperFunctions';
import { Request, Response} from 'express';

export const list = async (req: Request, res: Response) => {
    try {
        res.json(await helpers.displayTickets(req.query.status, req));
    } catch (err) {
        res.json(err)
    }
}

export const mytickets = async (req: Request, res: Response) => {
    try {
        res.json(await helpers.displayTickets(req.query.status, req, {
                where: {
                    assigneeID: req.session.userId
                }
            }));
    } catch (err) {
        res.json(err)
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
        res.json(await helpers.displayTickets(req.query.status, req, {
                    where: {
                        department: userDepartment,
                        assignee: null
                    }
                }));
    } catch (err) {
        res.json(err)
    }
}

export const outgoing = async (req: Request, res: Response) => {
    try {
        res.json(await helpers.displayTickets(req.query.status, req, {
                where: {
                    initiatorId: req.session.userId
                }
            }));
    } catch (err) {
        res.json(err)
    }
}