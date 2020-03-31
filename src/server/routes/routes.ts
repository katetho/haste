import { Request, Response} from 'express';
import express from 'express';
const router = express.Router();
import * as homeRoutes from './homeController';
import * as ticketsRoutes from './ticketsController';
import * as usersRoutes from './usersController';
import { helpers } from '../middleware/helperFunctions';

router.get('/', helpers.redirectSignin, homeRoutes.list);
router.get('/mytickets', helpers.redirectSignin, homeRoutes.mytickets);
router.get('/taketicket', helpers.redirectSignin, homeRoutes.taketicket);
router.get('/outgoing', helpers.redirectSignin, homeRoutes.outgoing);


router.get('/tickets', helpers.redirectSignin, ticketsRoutes.getAllTickets);
router.post('/tickets', helpers.redirectSignin, ticketsRoutes.postTicket);
router.get('/tickets/:ticketId', helpers.redirectSignin, ticketsRoutes.findTicket);
router.delete('/tickets/:ticketId', helpers.redirectSignin, ticketsRoutes.deleteTicket);
router.patch('/tickets/close', helpers.redirectSignin, ticketsRoutes.closeTicket);
router.patch('/tickets/:ticketId', helpers.redirectSignin, ticketsRoutes.takeTicket);

router.get('/users/register', helpers.redirectHome, usersRoutes.getRegister);
router.post('/users/register', helpers.redirectHome, usersRoutes.postRegister);
router.get('/users/signin', helpers.redirectHome, usersRoutes.getSignin);
router.post('/users/signin', helpers.redirectHome, usersRoutes.postSignin);
router.post('/users/forgot-password', helpers.redirectHome, usersRoutes.forgotPassword);
router.get('/users/signout', helpers.redirectSignin, usersRoutes.signout);

router.use((req: Request, res: Response) => { //page not found
    res.render('404', {
        layout: 'users'
    });
})
export { router };
