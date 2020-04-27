"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirects = function (req, res, next) {
    let url = req.originalUrl;
    if (req.session && !req.session.userId && !url.includes('users')) {
        res.redirect('/users/signin');
    }
    else if (req.session && req.session.userId && url.includes('user')) {
        res.redirect('/');
    }
    else {
        next();
    }
};
//# sourceMappingURL=redirects.js.map