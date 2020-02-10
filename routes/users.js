const express = require('express');
const users = express();
const path = require('path');
const User = require('../models/User');
const helpers = require('../middleware/helperFunctions');
const validate = require('../middleware/validators');

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
    let invalid = [];

    if (!validate.name(req.body.firstName)) {
        invalid.push('firstName');
    }
    if (!validate.name(req.body.lastName)) {
        invalid.push('lastName');
    }
    if (!validate.password(req.body.password)) {
        invalid.push('password');
    }
    if (!validate.email(req.body.email)) {
        invalid.push('email');
    }
    if (!validate.department(req.body.department)) {
        invalid.push('department');
    }
    if (invalid.length) {
        return res.status(422)
            .json(invalid);
    }
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        department: req.body.department,
        password: req.body.password,
        role: req.body.role
    });
    try {
        let exists = await User.find({
            email: req.body.email
        });
        // if([]) - true; if([]==false) - true as well
        //[] is interpreted as 0 by '==', and 'if' converts any existing object to true
        if (!exists.length) {
            const savedUser = user.save();
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
        res.render('signin', {
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
                res.json(user.firstName); //when they're tring to access certain pages
            } else {
                res.status(401)
                    .json("Wrong email or password")
            }
        } else {
            res.status(422)
                .json("Missing email or password")
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
