import { Request, Response, NextFunction} from 'express';

export const redirects = {
    redirectSignin: async function(req: Request, res: Response, next: NextFunction) { //redirect unauthenticated users
        if (req.session && !req.session.userId) {
            res.redirect('/users/signin')
        } else {
            next();
        }
    },
    redirectHome: function(req: Request, res: Response, next: NextFunction) { //redirect authenticated users
        if (req.session && req.session.userId) {
            res.redirect('/')
        } else {
            next();
        }
    }
}
