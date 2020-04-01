import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { helpers } from '../services/helperFunctions';
import { Op } from "sequelize";
import { Request, Response} from 'express';

export const getAllTickets = async (req: Request, res: Response) => {
      try { //status - show all, but closed tickets
          let status: string[] = helpers.status();
          const tickets: Ticket[] = await Ticket.findAll({
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
  }
  
  export const postTicket = async (req: Request, res: Response) => {
      try {
          let status = helpers.status();
          let initiatorId: number = req.session.userId;
          const ticket: Ticket = await Ticket.create({
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
  }

  export const findTicket = async (req: Request, res: Response) => {
      try {
          const ticket: Ticket = await Ticket.findByPk(req.params.ticketId);
          res.json(ticket);
      } catch (err) {
          res.json({
              message: err
          });
      }
  }

  export const deleteTicket = async (req: Request, res: Response) => {
      try {
          Ticket.destroy({
            where: {
              id: req.params.ticketId
            }
          })
          const tickets: Ticket[] = await Ticket.findAll()
          res.json(tickets);
      } catch (err) {
          res.json({
              message: err
          })
      }
  }

  export const closeTicket = async (req: Request, res: Response) => {
      try {
          let ticketId: number = req.body.ticketId;
          let replacement: object = {};
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
          let status: string[] = helpers.status();
          const tickets: Ticket[] = await Ticket.findAll({
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
  }

  //take ticket
  export const takeTicket = async (req: Request, res: Response) => {
      try {
          let tickID: string = req.params.ticketId;
          const currentUser: User = await User.findByPk(req.session.userId);
          let fullname: string = currentUser.firstName + ' ' + currentUser.lastName;

          const replacement = {
              assigneeID: req.session.userId, //when a person hits 'take'
              assignee: fullname,
              status: 'assigned'
          }
          const updatedTicket: [number, Ticket[]] = await Ticket.update(replacement, {
              where: {
                  id: tickID
              }
          })
          res.json(updatedTicket)
      } catch (err) {
          res.json({
              message: err
          })
      }
  }
