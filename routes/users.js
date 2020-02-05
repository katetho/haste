const express = require('express');
const users = express();
const path = require('path');
const User = require('../models/User');
const helpers = require('../middleware/helperFunctions');

users.set('views', path.join(__dirname, '../views'));

users.get('/register', async (req, res) => {
    try {
        res.render('register', {
            layout: 'users'
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
})

users.post('/register', helpers.redirectHome, async (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    try {
        let exists = await User.find({
            email: req.body.email
        });
        if (!exists) {
            const savedUser = user.save();
            res.render('<h1>Check your email!</h1>', {
                layout: 'users'
            });
        } else {
            res.json('user exists')
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
})

users.get('/signin', helpers.redirectHome, async (req, res) => {
    try {
        res.render('login', {
            layout: 'users'
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
})

users.post('/signin', helpers.redirectHome, async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            const user = await User.findOne({
                email: req.body.email
            })
            if (user && user.password === req.body.password) { //if the user's present in the DB
                req.session.user = user; //create this field & check for the presence of it
                return res.redirect('/'); //when they're tring to access certain pages
            }
            res.json('not found')
        } else {
            res.status(422)
                .json({
                    error: "missing email or password"
                })
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
})

users.get('/forgot-password', helpers.redirectHome, async (req, res) => {
    try {
        res.render('forgotpass', {
            layout: 'users'
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
})

users.get('/signout', helpers.redirectSignin, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.redirect('/');
        }
        res.clearCookie('sid');
        res.redirect('/users/signin')
    });
})

module.exports = users;
