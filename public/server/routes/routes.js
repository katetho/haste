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
const helperFunctions_1 = require("../middleware/helperFunctions");
router.get('/', helperFunctions_1.helpers.redirectSignin, homeRoutes.list);
router.get('/mytickets', helperFunctions_1.helpers.redirectSignin, homeRoutes.mytickets);
router.get('/taketicket', helperFunctions_1.helpers.redirectSignin, homeRoutes.taketicket);
router.get('/outgoing', helperFunctions_1.helpers.redirectSignin, homeRoutes.outgoing);
router.get('/tickets', helperFunctions_1.helpers.redirectSignin, ticketsRoutes.getAllTickets);
router.post('/tickets', helperFunctions_1.helpers.redirectSignin, ticketsRoutes.postTicket);
router.get('/tickets/:ticketId', helperFunctions_1.helpers.redirectSignin, ticketsRoutes.findTicket);
router.delete('/tickets/:ticketId', helperFunctions_1.helpers.redirectSignin, ticketsRoutes.deleteTicket);
router.patch('/tickets/close', helperFunctions_1.helpers.redirectSignin, ticketsRoutes.closeTicket);
router.patch('/tickets/:ticketId', helperFunctions_1.helpers.redirectSignin, ticketsRoutes.takeTicket);
router.get('/users/register', helperFunctions_1.helpers.redirectHome, usersRoutes.getRegister);
router.post('/users/register', helperFunctions_1.helpers.redirectHome, usersRoutes.postRegister);
router.get('/users/signin', helperFunctions_1.helpers.redirectHome, usersRoutes.getSignin);
router.post('/users/signin', helperFunctions_1.helpers.redirectHome, usersRoutes.postSignin);
router.post('/users/forgot-password', helperFunctions_1.helpers.redirectHome, usersRoutes.forgotPassword);
router.get('/users/signout', helperFunctions_1.helpers.redirectSignin, usersRoutes.signout);
router.use((req, res) => {
    res.render('404', {
        layout: 'users'
    });
});
//# sourceMappingURL=routes.js.map