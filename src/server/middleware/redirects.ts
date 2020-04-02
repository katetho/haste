import { Request, Response, NextFunction} from 'express';

export const redirects = {
    redirectSignin: function(req: Request, res: Response, next: NextFunction): void { //redirect unauthenticated users
        if (req.session && !req.session.userId) {
            res.redirect('/users/signin')
        } else {
            next();
        }
    },
    redirectHome: function(req: Request, res: Response, next: NextFunction): void { //redirect authenticated users
        if (req.session && req.session.userId) {
            res.redirect('/')
        } else {
            next();
        }
    }
}
