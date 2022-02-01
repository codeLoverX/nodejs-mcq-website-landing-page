import { Application, Request, Response, NextFunction } from "express"
import { CompetitionMongoose } from "../db/models/Competition";
import { EvaluationMongoose } from "../db/models/Evaluation";
import { UserMongoose } from "../db/models/User";
import { ApplicationInterface, ApplicationMongoose } from "../db/models/Application";
import { auth } from "../middleware/auth";
const methodOverride = require('method-override');
import { keyRenameObject } from '../helpers/keyRename'
import { formLabel } from "../db/formLables";

module.exports = function (app: Application) {
    let nav = [
        { name: "Profile", url: "/home-judge" },
        { name: "View applications", url: "/all-applications-judge" },
        { name: "Logout", url: "/logout" }

    ]

    app.get('/home-judge', auth, function (req: Request, res: Response, next: NextFunction) {
        let user = { ...req.session.user }
        delete user._id
        delete user.__v
        delete user.passWord
        res.render('judge/home', {
            user: keyRenameObject(user, 'user'), nav, signInStatus: req.session.user.signInStatus
        });
    });


    app.get('/all-applications-judge', auth, async (req: Request, res: Response, next: NextFunction) => {
        let application: Array< ApplicationInterface & {formLabel: typeof formLabel} >  = await ApplicationMongoose.find({}).lean()
        let evaluation = await EvaluationMongoose.find({}).populate('applicationID').lean()
        // res.json({evaluation})
        for (let i=0; i < application.length; i++) {
            application[i].formLabel = formLabel
            // evaluation[i].applicationID.formLabel = formLabel
        }
        for (let currApplication of application) {
            delete currApplication.__v
            delete currApplication.createdAt
        }
        res.render('judge/all-applications', {
            nav,
            evaluation,
            application,
            signInStatus: req.session.user.signInStatus,
            formLabel
        });
    });


    app.get('/get-applications-judge', auth, async (req: Request, res: Response, next: NextFunction) => {
        let user = { ...req.session.user }
        let usertype = ""
        if (user.signInStatus === "judge") { usertype = "judge"; }
        else if (user.signInStatus === "organizer") { usertype = "organizer"; }
        let application = await ApplicationMongoose.find({})

        res.render('judge/all-applications', {
            usertype,
            application: keyRenameObject(application, 'application'),
            nav,
            signInStatus: req.session.user.signInStatus,
            formLabel
        });
    });

    // deleteApplication
    app.post('/post-evaluation/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
        let funding = parseFloat(req.body.funding)
        let ratings = parseFloat(req.body.ratings)
        let numberOfForeignVisitors = parseFloat(req.body.numberOfForeignVisitors)
        let numberOfLocalVisitors = parseFloat(req.body.numberOfLocalVisitors)
        let toilet = parseFloat(req.body.toilet)
        let accomodation = parseFloat(req.body.accomodation)
        let plumbing = parseFloat(req.body.plumbing)
        let staff = parseFloat(req.body.staff)
        let authority = parseFloat(req.body.authority)

        let evaluation = await EvaluationMongoose.findByIdAndUpdate(req.params.id, {
            markEachElements: [funding, ratings, numberOfForeignVisitors, numberOfLocalVisitors,
                toilet, accomodation, plumbing, 
                staff, authority
            ],
            TotalMark: funding + ratings + numberOfForeignVisitors + numberOfLocalVisitors+
            toilet+ accomodation+ plumbing+ 
            staff+ authority
        })
        res.redirect('/all-applications-judge')
    });





}