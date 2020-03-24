const express = require('express');
const router = express.Router();
const ticketsRoutes = require('./ticketsController');
const homeRoutes = require('./homeController');
const usersRoutes = require('./usersController');
const helpers = require('../middleware/helperFunctions');

router.get('/', helpers.redirectSignin, homeRoutes.list);
router.get('/mytickets', helpers.redirectSignin, homeRoutes.mytickets);
router.get('/taketicket', helpers.redirectSignin, homeRoutes.taketicket);
router.get('/outgoing', helpers.redirectSignin, homeRoutes.outgoing);

router.use('/tickets', helpers.redirectSignin, ticketsRoutes);
router.use('/users', helpers.redirectHome, usersRoutes);
router.use((req, res) => { //page not found
    res.render('404', {
        layout: 'users'
    });
})

module.exports = router;
