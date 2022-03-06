import { Application, Request, Response, NextFunction } from "express"

export let auth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user)
        return next();
    else
        res.render('login-demo', { warning: "Login first" });
}