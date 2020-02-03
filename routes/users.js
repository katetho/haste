const express = require('express');
const users = express();
const path = require('path');

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

users.post('/register', async (req, res) => {
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

users.get('/signin', async (req, res) => {
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

users.post('/signin', async (req, res) => {
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

users.get('/forgot-password', async (req, res) => {
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

module.exports = users;
