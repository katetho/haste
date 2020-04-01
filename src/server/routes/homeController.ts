import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { Session } from '../models/Session';
import { helpers } from '../services/helperFunctions';
import { Op } from "sequelize";
import { Request, Response} from 'express';


  export const list =  async (req: Request, res: Response) => {
      try {
          let status: any;
          if (req.query.status === undefined || req.query.status === 'active') {
              status = helpers.status();
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

export const mytickets = async (req: Request, res: Response) => {
      try {
          let status: any;
          if (req.query.status === undefined || req.query.status === 'active') {
              status = helpers.status();
          } else {
              status = req.query.status;
          }
          const tickets: Ticket[] = await Ticket.findAll({
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

export const taketicket = async (req: Request, res: Response) => {
      try {
          let status: any;
          if (req.query.status === undefined || req.query.status === 'active') {
              status = helpers.status();
          } else {
              status = req.query.status;
          }
          const sesh: any = await Session.findOne({
              where: {
                  sid: req.session.id
              },
              include: [User]
          });
          let userDepartment: string = sesh.User.department;
          const tickets: Ticket[] = await Ticket.findAll({
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

export const outgoing = async (req: Request, res: Response) => {
      try {
          let status: any;
          if (req.query.status === undefined || req.query.status === 'active') {
              status = helpers.status();
          } else {
              status = req.query.status;
          }
          let initiatorId: any = req.session.userId;
          let tickets: Ticket[] = await Ticket.findAll({
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