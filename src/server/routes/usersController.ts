import { Request, Response} from 'express';
const Base64 = require('js-base64').Base64;
import { User } from '../models/User';
import { validate } from '../services/validators';
import bcrypt from 'bcrypt';
const saltRounds: number = 10; //for password hashing

export const getRegister = async (req: Request, res: Response) => { // /get register
      try {
          res.render('register', {
              layout: 'users'
          });
      } catch (err) {
          res.json({
              message: err
          });
      }
  }

  export const postRegister = async (req: Request, res: Response) => { //post register
      try {
          let invalid = [];
          const result = await User.findOne({
              where: {
                  email: req.body.email
              }
          });

            if(result !== null) {
            invalid.push('email')
          }

          if (req.body.repPassword !== req.body.password) {
              invalid.push('repeatPassword');
          }
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
          // if([]) - true; if([]==false) - true as well
          //[] is interpreted as 0 by '==', and 'if' converts any existing object to true
          if (invalid.length) {
              return res.status(422)
                  .json(invalid);
          }
          bcrypt.hash(req.body.password, saltRounds)
              .then(async (hash) => {
                  const user = await User.create({
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      email: req.body.email,
                      department: req.body.department,
                      password: hash,
                      role: req.body.role
                  }).catch((err: string)=>{
                    console.log('Query error: '+err)
                  });
                res.json(user);
              })
      } catch (err) {
          res.json({
              message: err
          });
      }
  }

  export const getSignin = async (req: Request, res: Response) => { //get signin
      try {
          res.render('signin', {
              layout: 'users'
          });
      } catch (err) {
          res.json({
              message: err
          });
      }
  }
  
  export const postSignin = async (req: Request, res: Response) => { //post signin
      try {
          let email = req.body.email;
          let password = req.body.password;
          if (email && password) {
              let validPassword = false;
              const user = await User.findOne({
                  where: {
                      email: req.body.email
                  }
              })
              if (user) {
                  bcrypt.compare(req.body.password, user.password)
                      .then( async (result) => {
                          validPassword = result;
                          if (validPassword) { //if the user's present in the DB
                          req.session.userId = user.id; //create this field & check for the presence of it
                              let username = Base64.encode(user.firstName + ' ' + user.lastName);
                              res.json(username); //when they're tring to access certain pages
                          } else {
                              res.status(401)
                                  .json('password');
                          }
                      })
                      .catch((err) => {
                          console.log(err)
                      });
              } else {
                  res.status(401)
                      .json('email');
              }
          } else {
              let missing = [];
              if (!req.body.password) {
                  missing.push("password");
              }
              if (!req.body.email) {
                  missing.push("email");
              }
              res.status(422)
                  .json(missing)
          }
      } catch (err) {
          res.json({
              message: err
          });
      }
  }

  export const forgotPassword = async (req: Request, res: Response) => { // get forgot-password
      try {
          res.render('forgotpass', {
              layout: 'users'
          });
      } catch (err) {
          res.json({
              message: err
          });
      }
  }

  export const signout = (req: Request, res: Response) => { // get signout
      req.session.destroy((err: string) => {
          if (err) {
              res.redirect('/');
          }
          res.clearCookie('sid');
          res.redirect('/users/signin')
      });
    }
