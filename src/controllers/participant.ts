import { Application, Request, Response, NextFunction } from "express"
import { CompetitionMongoose } from "../db/models/Competition";
import { EvaluationMongoose } from "../db/models/Evaluation";
import { UserMongoose } from "../db/models/User";
import { ApplicationInterface, ApplicationMongoose } from "../db/models/Application";
import { auth } from "../middleware/auth";
import { keyRenameObject } from "../helpers/keyRename";
import { formLabel } from "../db/formLables";
import { taskDate } from "../helpers/dateFormat";
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

module.exports = function (app: Application) {

    let nav = [
        { name: "Profile", url: "/home-participant" },
        { name: "Application Submission", url: "/application-submission" },
        { name: "Logout", url: "/logout" }
    ]

    app.get('/home-participant', auth, function (req: Request, res: Response, next: NextFunction) {
        let user = { ...req.session.user }
        delete user._id
        delete user.__v
        delete user.passWord
        res.render('participant/home', {
            user: keyRenameObject(user, 'user'),
            nav,
            signInStatus: req.session.user.signInStatus
        });
    });

    app.get('/application-submission', auth, async (req: Request, res: Response, next: NextFunction) => {
        let user = { ...req.session.user }
        let newApplication = false
        try {

            let application = await ApplicationMongoose.findOne({ staffID: user._id }).lean()
            if (application === null) {
                newApplication = true
                application = new ApplicationMongoose({
                    applicationStatus: "Not submitted",
                    // more
                    programName: null,
                    numberOfLocalVisitors: null,
                    funding: null,
                    ratings: null,
                    numberOfForeignVisitors: null,
                    evaluationPoints: {
                        numberOfLocalVisitors: null,
                        funding: null,
                        ratings: null,
                        numberOfForeignVisitors: null,
                    }
                }).toObject()

            }
            let { evaluationPoints } = application
            delete application.__v
            delete application.createdAt
            delete application.updatedAt
            delete application.evaluationPoints
            res.render('participant/application-submission', {
                application: keyRenameObject(application, 'application'),
                nav,
                signInStatus: req.session.user.signInStatus,
                evaluationPoints,
                newApplication,
                formLabel,
            });
        }

        catch (err) {
            res.render('participant/application-submission', {
                warning: "Problems loading. Try again",
                application: {},
                nav,
                signInStatus: req.session.user.signInStatus
            });
        }

    })


    app.post('/application-submission', auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log({filled: req.body.numberOfLocalVisitors.length, nonFilled: req.body.toilet.length, value: req.body.toilet  })
            if (req.body.numberOfLocalVisitors.length === 0 ||
                req.body.funding.length === 0 ||
                req.body.ratings.length === 0 ||
                req.body.numberOfForeignVisitors.length === 0 ||
                req.body.toilet.length === 0 ||
                req.body.plumbing === 0 ||
                req.body.accomodation.length === 0 ||
                req.body.staff.length === 0 ||
                req.body.authority.length === 0 ) {
                    throw new Error("Missed one value. Use the timeline and fill all 3 sets of questions!")
            }
            let application = new ApplicationMongoose({
                applicationReff: req.body.applicationReff,
                applicationStatus: "Submitted",
                staffID: req.session.user._id,
                submissionDtae: new Date().toLocaleDateString(),
                _id: uuidv4(),
                // more
                programName: req.body["Program name"],
                evaluationPoints: {
                    numberOfLocalVisitors: req.body.numberOfLocalVisitors,
                    funding: req.body.funding,
                    ratings: req.body.ratings,
                    numberOfForeignVisitors: req.body.numberOfForeignVisitors,
                    toilet: req.body.toilet,
                    plumbing: req.body.plumbing,
                    accomodation: req.body.accomodation,
                    staff: req.body.staff,
                    authority: req.body.authority,
                }
            })
            await application.save()
            let evaluation = new EvaluationMongoose({
                applicationID: application._id,
                _id: uuidv4(),
                evaluationDateTime: new Date().toLocaleDateString(),
                judgeID: "judge",
                markEachElements: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                rank: null,
                result: "",
                TotalMark: 0,
            })
            await evaluation.save()

            let applicationObject = application.toObject()
            delete applicationObject.__v
            res.redirect('/application-submission')
        }
        catch (err) {
            res.render('participant/application-submission', {
                warning: err,
                application: {},
                nav,
                signInStatus: req.session.user.signInStatus
            });
        }
    })


}