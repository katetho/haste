import { Request, Response} from 'express';
import express from 'express';
const router = express.Router();
import * as homeRoutes from './homeController';
import * as ticketsRoutes from './ticketsController';
import * as usersRoutes from './usersController';
import { redirects } from '../middleware/redirects';

router.use(redirects);
router.get('/', homeRoutes.list);
router.get('/mytickets', homeRoutes.mytickets);
router.get('/taketicket', homeRoutes.taketicket);
router.get('/outgoing', homeRoutes.outgoing);

router.get('/tickets', ticketsRoutes.getAllTickets);
router.post('/tickets', ticketsRoutes.postTicket);
router.get('/tickets/:ticketId', ticketsRoutes.findTicket);
router.delete('/tickets/:ticketId', ticketsRoutes.deleteTicket);
router.patch('/tickets/close', ticketsRoutes.closeTicket);
router.patch('/tickets/:ticketId', ticketsRoutes.takeTicket);

router.get('/users/register', usersRoutes.getRegister);
router.post('/users/register', usersRoutes.postRegister);
router.get('/users/signin', usersRoutes.getSignin);
router.post('/users/signin', usersRoutes.postSignin);
router.post('/users/forgot-password', usersRoutes.forgotPassword);
router.get('/users/signout', usersRoutes.signout);

router.use((req: Request, res: Response) => { //page not found
    res.render('404', {
        layout: 'users'
    });
})
export { router };
