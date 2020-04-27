"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const homeRoutes = __importStar(require("./homeController"));
const ticketsRoutes = __importStar(require("./ticketsController"));
const usersRoutes = __importStar(require("./usersController"));
//router.use(redirects);
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
router.use((req, res) => {
    res.render('404', {
        layout: 'users'
    });
});
//# sourceMappingURL=routes.js.map