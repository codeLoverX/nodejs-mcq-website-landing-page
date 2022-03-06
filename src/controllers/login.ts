import { Application, Request, Response, NextFunction } from "express"
import { UserMongoose } from "../db/models/User";
import { seeder } from "../db/seeder";
const { v4: uuidv4 } = require('uuid');

module.exports = function (app: Application) {


    app.get('/works', (req: Request, res: Response, next: NextFunction) => res.json({ success: true, req: req.header.length }))
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.render('landing');
    })
    app.get('/login', (req: Request, res: Response, next: NextFunction) => {
        res.render('login-demo');
    })
    app.get('/login-demo', (req: Request, res: Response, next: NextFunction) => {
        res.render('login-demo');
    })
    app.get('/signup', (req: Request, res: Response, next: NextFunction) => {
        res.render('signup');
    })
    app.get('/reset', async (req: Request, res: Response, next: NextFunction) => {
        res.json(await seeder())
    })

    // Logout endpoint
    app.get('/logout', function (req: Request, res: Response, next: NextFunction) {
        req.session.destroy();
        res.render('login', { success: "Logged out" });
    });

    app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        let IsNoWarning: boolean = (req.body.username && req.body.password) || req.body.usernameNoPassword;
        if (IsNoWarning) {
            let user = new UserMongoose();
            try {
                if (!req.body.usernameNoPassword) user = await UserMongoose.findOne({ userName: `@${req.body.username}`, passWord: req.body.password });
                else {
                    user = await UserMongoose.findOne({ userName: `@${req.body.usernameNoPassword}` });
                }
                req.session.user = user;


                function executesignin() {
                    res.render('signin', { warning: "Incorrect password or username" })
                }

                function executehomeparticipant() {
                    res.redirect('/home-participant')
                }

                function executehomejudge() {
                    res.redirect('/home-judge')
                }

                function executehomeorganizer() {
                    res.redirect('/home-organizer')
                }

                function executenousernameorpassword() {
                    res.render('signin', { warning: "No login or usertype" })
                }

                switch (user.signInStatus) {
                    case "":
                        executesignin();
                        break;

                    case "participant":
                        executehomeparticipant();
                        break;

                    case "judge":
                        executehomejudge();
                        break;

                    case "organizer":
                        executehomeorganizer();
                        break;

                    default:
                        executenousernameorpassword();
                        break;

                }
            }
            catch (err) {
                res.render('login', { warning: "Incorrect password or username" });
            }
        }
        else {
            res.render('login', { warning: "No login or usertype" });
        }
    })

    app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body.userType === "judge") {
                let judge = new UserMongoose({
                    address: req.body.address,
                    passWord: req.body.passWord,
                    signInStatus: req.body.userType,
                    email: req.body.email,
                    userType: req.body.name,
                    name: req.body.name,
                    userName: req.body.userName,
                    judgePosition: req.body.judgePosition,
                    _id: uuidv4()
                })
                await judge.save()
            }

            if (req.body.userType === "organizer") {
                let organizer = new UserMongoose({
                    address: req.body.address,
                    passWord: req.body.passWord,
                    signInStatus: req.body.userType,
                    email: req.body.email,
                    userType: req.body.name,
                    name: req.body.name,
                    userName: req.body.userName,
                    organizerPosition: req.body.organizerPosition,
                    _id: uuidv4()
                })
                organizer.save()
            }
            if (req.body.userType === "judge") {
                let participant = new UserMongoose({
                    address: req.body.address,
                    passWord: req.body.passWord,
                    signInStatus: req.body.userType,
                    email: req.body.email,
                    userType: req.body.name,
                    name: req.body.name,
                    userName: req.body.userName,
                    PTJType: req.body.PTJType,
                    PTJName: req.body.PTJName,
                    _id: uuidv4()
                })
                participant.save()
            }
            res.render('login', { success: "Successful login!" })
        }
        catch (err) {
            res.render('signup', { warning: err });
        }
    })
}