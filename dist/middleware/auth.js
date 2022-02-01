"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
let auth = (req, res, next) => {
    if (req.session.user)
        return next();
    else
        res.render('login', { warning: "Login first" });
};
exports.auth = auth;
