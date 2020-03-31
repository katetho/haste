"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base64 = require('js-base64').Base64;
const User_1 = require("../models/User");
const validators_1 = require("../services/validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10; //for password hashing
exports.getRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('register', {
            layout: 'users'
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let invalid = [];
        const result = yield User_1.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (result !== null) {
            invalid.push('email');
        }
        if (req.body.repPassword !== req.body.password) {
            invalid.push('repeatPassword');
        }
        if (!validators_1.validate.name(req.body.firstName)) {
            invalid.push('firstName');
        }
        if (!validators_1.validate.name(req.body.lastName)) {
            invalid.push('lastName');
        }
        if (!validators_1.validate.password(req.body.password)) {
            invalid.push('password');
        }
        if (!validators_1.validate.email(req.body.email)) {
            invalid.push('email');
        }
        if (!validators_1.validate.department(req.body.department)) {
            invalid.push('department');
        }
        // if([]) - true; if([]==false) - true as well
        //[] is interpreted as 0 by '==', and 'if' converts any existing object to true
        if (invalid.length) {
            return res.status(422)
                .json(invalid);
        }
        bcrypt_1.default.hash(req.body.password, saltRounds)
            .then((hash) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                department: req.body.department,
                password: hash,
                role: req.body.role
            }).catch((err) => {
                console.log('Query error: ' + err);
            });
            res.json(user);
        }));
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.getSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('signin', {
            layout: 'users'
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.postSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            let validPassword = false;
            const user = yield User_1.User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                bcrypt_1.default.compare(req.body.password, user.password)
                    .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                    validPassword = result;
                    if (validPassword) { //if the user's present in the DB
                        req.session.userId = user.id; //create this field & check for the presence of it
                        let username = Base64.encode(user.firstName + ' ' + user.lastName);
                        res.json(username); //when they're tring to access certain pages
                    }
                    else {
                        res.status(401)
                            .json('password');
                    }
                }))
                    .catch((err) => {
                    console.log(err);
                });
            }
            else {
                res.status(401)
                    .json('email');
            }
        }
        else {
            let missing = [];
            if (!req.body.password) {
                missing.push("password");
            }
            if (!req.body.email) {
                missing.push("email");
            }
            res.status(422)
                .json(missing);
        }
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('forgotpass', {
            layout: 'users'
        });
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.signout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.redirect('/');
        }
        res.clearCookie('sid');
        res.redirect('/users/signin');
    });
};
//# sourceMappingURL=usersController.js.map