import { Request, Response, NextFunction} from 'express';

export const redirects = function(req: Request, res: Response, next: NextFunction): void { //redirect unauthenticated users
    let url = req.originalUrl;
    if (req.session && !req.session.userId && !url.includes('users')) {
        res.redirect('/users/signin')
    } else if (req.session && req.session.userId && url.includes('user')) {
        res.redirect('/')
    }
    else {
        next();
    }
}
