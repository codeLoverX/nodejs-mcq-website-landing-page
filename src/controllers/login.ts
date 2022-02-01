import { Application, Request, Response, NextFunction } from "express"
import { CompetitionMongoose } from "../db/models/Competition";
import { EvaluationMongoose } from "../db/models/Evaluation";
import { UserMongoose } from "../db/models/User";
import { ApplicationInterface, ApplicationMongoose } from "../db/models/Application";
import { seeder } from "../db/seeder";
const methodOverride = require('method-override');

module.exports = function (app: Application) {


    app.get('/works', (req: Request, res: Response, next: NextFunction) => res.json({ success: true, req: req.header.length }))
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.render('login');
    })
    app.get('/reset', async (req: Request, res: Response, next: NextFunction) => {
        res.json(await seeder())
    })

    // Logout endpoint
    app.get('/logout', function (req: Request, res: Response, next: NextFunction) {
        req.session.destroy();
        res.render('login', { success: "Logged out" });
    });

    app.post('/', async (req: Request, res: Response, next: NextFunction) => {
        let IsNoWarning: boolean = (req.body.username && req.body.password) || req.body.usertype;
        if (IsNoWarning) {
            let user = new UserMongoose();
            try {
                if (!req.body.usertype) user = await UserMongoose.findOne({ userName: req.body.username, passWord: req.body.password });
                else {
                    user = await UserMongoose.findOne({ _id: req.body.usertype });
                }
                if (user === null) {
                    throw new Error('Null user. Login or password is incorrect!')
                }
                req.session.user = user;
            }
            catch (err) {
                res.render('login', { warning: err });
            }
            if (user.signInStatus === "participant") res.redirect('/home-participant')
            else if (user.signInStatus === "judge") res.redirect('/home-judge')
            else res.redirect('/home-organizer')
        }
        else {
            res.render('login', { warning: "No login or usertype" });
        }
    })

}