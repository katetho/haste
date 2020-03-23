const express = require('express');
const router = express.Router();
const ticketsRoutes = require('./ticketsController');
const homeRoutes = require('./homeController');
const usersRoutes = require('./usersController');
const helpers = require('../middleware/helperFunctions');

router.use('/tickets', helpers.redirectSignin, ticketsRoutes);
router.use('/', helpers.redirectSignin, homeRoutes);
router.use('/users', helpers.redirectHome, usersRoutes);
router.use((req, res) => { //page not found
    res.render('404', {
        layout: 'users'
    });
})

module.exports = router;
