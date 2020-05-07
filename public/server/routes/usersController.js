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
const User_1 = require("../models/User");
const validators_1 = require("../services/validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Session_1 = require("../models/Session");
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
    let invalid = [];
    try {
        const result = yield User_1.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (result !== null) {
            invalid.push('user exists');
        }
        if (req.body.repPassword !== req.body.password) {
            invalid.push("passwords don't match");
        }
        if (!validators_1.validate.name(req.body.firstName)) {
            invalid.push('invalid first name');
        }
        if (!validators_1.validate.name(req.body.lastName)) {
            invalid.push('invalid last name');
        }
        if (!validators_1.validate.password(req.body.password)) {
            invalid.push('invalid password');
        }
        if (!validators_1.validate.email(req.body.email)) {
            invalid.push('invalid email');
        }
        if (!validators_1.validate.department(req.body.department)) {
            invalid.push('department');
        }
        if (invalid.length > 0) {
            throw new Error('invalid');
        }
        const hash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
        const user = yield User_1.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            department: req.body.department,
            password: hash,
            role: req.body.role
        });
        res.json(user);
    }
    catch (err) {
        if (err.message === 'invalid') {
            res.status(422)
                .json(invalid);
        }
        res.status(422)
            .json({
            message: err
        });
    }
});
exports.getSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(req.session.userId);
    }
    catch (err) {
        res.json({
            message: err
        });
    }
});
exports.postSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            user = yield User_1.User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                let result = yield bcrypt_1.default.compare(req.body.password, user.password);
                if (result) { //if the user's present in the DB
                    req.session.userId = user.id; //create this field & check for the presence of it
                    let username = user.firstName + ' ' + user.lastName;
                    res.json(user); //when they're tring to access certain pages
                }
                else {
                    res.status(401).json('password');
                }
            }
            else {
                res.status(401).json('email');
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
            res.status(423).json(missing);
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
            Session_1.Session.destroy({
                where: {
                    sid: req.session.id
                }
            });
        }
        res.clearCookie('sid');
        res.redirect('/users/signin');
        req.session = null;
    });
};
//# sourceMappingURL=usersController.js.map