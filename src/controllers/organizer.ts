import { Application, Request, Response, NextFunction } from "express"
import { CompetitionMongoose } from "../db/models/Competition";
import { EvaluationMongoose } from "../db/models/Evaluation";
import { UserMongoose } from "../db/models/User";
import { ApplicationInterface, ApplicationMongoose } from "../db/models/Application";
const { v4: uuidv4 } = require('uuid');
import { auth } from "../middleware/auth";
const methodOverride = require('method-override');
import { keyRenameObject } from "../helpers/keyRename";
import { formLabel } from "../db/formLables";

module.exports = function (app: Application) {

    let nav = [
        { name: "Profile", url: "/home-organizer" },
        { name: "View Applications", url: "/all-applications-organizer" },
        { name: "Logout", url: "/logout" }
    ]

    app.get('/home-organizer', auth, function (req: Request, res: Response, next: NextFunction) {
        let user = { ...req.session.user }
        delete user._id
        delete user.__v
        delete user.passWord
      
        res.render('organizer/home', {
            user: keyRenameObject(user, 'user'),
            nav,
            signInStatus: req.session.user.signInStatus
        });
    });

    app.get('/all-applications-organizer', auth, async (req: Request, res: Response, next: NextFunction) => {
        let application = await ApplicationMongoose.find({}).lean()
        let evaluation = await EvaluationMongoose.find({}).populate('applicationID').lean()
        for (let i = 0; i < application.length; i++) {
            delete application[i].__v
            delete application[i].createdAt
            delete application[i].updatedAt
            delete application[i].evaluationPoints 
        }
        res.render('organizer/all-applications', {
            nav, 
            evaluation,
            application,
            signInStatus: req.session.user.signInStatus,
            formLabel
        });
    });


    app.post('/delete-application/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
        let application = await ApplicationMongoose.findByIdAndDelete(req.params.id)
        res.redirect('/all-applications-organizer')
    });


    // app.get('/get-applications-organizer', auth, async (req: Request, res: Response, next: NextFunction) => {
    //     let user = { ...req.session.user }
    //     let usertype = ""
    //     if (user.signInStatus === "judge") { usertype = "judge"; }
    //     else if (user.signInStatus === "organizer") { usertype = "organizer"; }
    //     let application = await ApplicationMongoose.find({})
    //     console.log(typeof application)
    //     console.log({ application })
        
    //     res.render('organizer/all-applications', {
    //         usertype,
    //         application: keyRenameObject(application, 'application'),
    //         nav,
    //         signInStatus: req.session.user.signInStatus,
    //         formLabel
    //     });
    // });

   


}