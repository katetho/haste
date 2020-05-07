import { Request, Response} from 'express';
import { User } from '../models/User';
import { validate } from '../services/validators';
import bcrypt from 'bcrypt';
import { Session } from '../models/Session';
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
    let invalid = [];
    try {
        const result: User = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (result !== null) {
            invalid.push('user exists')
        }
        if (req.body.repPassword !== req.body.password) {
            invalid.push("passwords don't match");
        }
        if (!validate.name(req.body.firstName)) {
            invalid.push('invalid first name');
        }
        if (!validate.name(req.body.lastName)) {
            invalid.push('invalid last name');
        }
        if (!validate.password(req.body.password)) {
            invalid.push('invalid password');
        }
        if (!validate.email(req.body.email)) {
            invalid.push('invalid email');
        }
        if (!validate.department(req.body.department)) {
            invalid.push('department');
        }

          if (invalid.length > 0) {
              throw new Error('invalid');
          }
          const hash: string = await bcrypt.hash(req.body.password, saltRounds);
              const user: User = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                department: req.body.department,
                password: hash,
                role: req.body.role
            })
            res.json(user);
      } catch (err) {
          if (err.message==='invalid') {
            res.status(422)
            .json(invalid);
          }
        res.status(422)
        .json({
              message: err
          });
      }
  }

export const getSignin = async (req: Request, res: Response) => { //get signin
    try {
        res.json(req.session.userId)
    } catch (err) {
        res.json({
            message: err
        });
    }
}

export const postSignin = async (req: Request, res: Response) => { //post signin
    try {
        let user: User;
        let email: string = req.body.email;
        let password: string = req.body.password;
        if (email && password) {
                user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                let result: boolean = await bcrypt.compare(req.body.password, user.password)
                if (result) { //if the user's present in the DB
                    req.session.userId = user.id; //create this field & check for the presence of it
                    let username: string = user.firstName + ' ' + user.lastName;
                    res.json(user); //when they're tring to access certain pages
                } else {
                    res.status(401).json('password');
                }
            } else {
                res.status(401).json('email');
            }
        } else {
            let missing: string[]=[];
            if (!req.body.password) {
                missing.push("password");
            }
            if (!req.body.email) {
                missing.push("email");
            }
            res.status(423).json(missing)
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
            Session.destroy({
                 where: {
                    sid:req.session.id
                }
            })
         }
        res.clearCookie('sid');
        res.redirect('/users/signin');
        req.session=null;
    });
}