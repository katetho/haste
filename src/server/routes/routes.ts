import { Request, Response} from 'express';
import express from 'express';
const router = express.Router();
import * as homeRoutes from './homeController';
import * as ticketsRoutes from './ticketsController';
import * as usersRoutes from './usersController';
import { redirects } from '../middleware/redirects';

router.get('/', redirects.redirectSignin, homeRoutes.list);
router.get('/mytickets', redirects.redirectSignin, homeRoutes.mytickets);
router.get('/taketicket', redirects.redirectSignin, homeRoutes.taketicket);
router.get('/outgoing', redirects.redirectSignin, homeRoutes.outgoing);

router.get('/tickets', redirects.redirectSignin, ticketsRoutes.getAllTickets);
router.post('/tickets', redirects.redirectSignin, ticketsRoutes.postTicket);
router.get('/tickets/:ticketId', redirects.redirectSignin, ticketsRoutes.findTicket);
router.delete('/tickets/:ticketId', redirects.redirectSignin, ticketsRoutes.deleteTicket);
router.patch('/tickets/close', redirects.redirectSignin, ticketsRoutes.closeTicket);
router.patch('/tickets/:ticketId', redirects.redirectSignin, ticketsRoutes.takeTicket);

router.get('/users/register', redirects.redirectHome, usersRoutes.getRegister);
router.post('/users/register', redirects.redirectHome, usersRoutes.postRegister);
router.get('/users/signin', redirects.redirectHome, usersRoutes.getSignin);
router.post('/users/signin', redirects.redirectHome, usersRoutes.postSignin);
router.post('/users/forgot-password', redirects.redirectHome, usersRoutes.forgotPassword);
router.get('/users/signout', redirects.redirectSignin, usersRoutes.signout);

router.use((req: Request, res: Response) => { //page not found
    res.render('404', {
        layout: 'users'
    });
})
export { router };
