import { Application, Request, Response, NextFunction } from "express"
import { EvaluationMongoose } from "../db/models/Evaluation";
import { ApplicationMongoose } from "../db/models/Application";
import { auth } from "../middleware/auth";
import { keyRenameObject } from "../helpers/keyRename";
import { formLabel } from "../db/formLables";
import { uploadS3 } from "../middleware/fileStorage";
const { v4: uuidv4 } = require('uuid');
const aws = require("aws-sdk");
const { join } = require('path')
const dotenv = require("dotenv")

const path = join(__dirname, '../env/config.env')
dotenv.config({ path })
const s3 = new aws.S3({
    accessKeyId: process.env.Access_Key_ID,
    secretAccessKey: process.env.Secret_Access_Key,
});

module.exports = function (app: Application) {

    let nav = [
        { name: "Profile", url: "/home-participant" },
        { name: "Application Submission", url: "/application-submission" },
        { name: "Application Proof", url: "/proof-participant" },
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
                    proof: null,
                    staffName: req.session.user.staffName,
                    staffPTJType: req.session.user.PTJType,
                    applicationStatus: "Started",
                    staffID: req.session.user._id,
                    staffPTJName: req.session.user.PTJName,
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
            delete application.staffID
            delete application.evaluationPoints
            let applicationStatus = "Not rejected"
            if (application.applicationStatus) applicationStatus = "rejected"
            res.render('participant/application-submission', {
                application: keyRenameObject(application, 'application'),
                nav,
                signInStatus: req.session.user.signInStatus,
                evaluationPoints,
                newApplication,
                formLabel,
                applicationStatus
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
            console.log({ filled: req.body.numberOfLocalVisitors.length, nonFilled: req.body.toilet.length, value: req.body.toilet })
            if (req.body.numberOfLocalVisitors.length === 0 ||
                req.body.funding.length === 0 ||
                req.body.ratings.length === 0 ||
                req.body.numberOfForeignVisitors.length === 0 ||
                req.body.toilet.length === 0 ||
                req.body.plumbing === 0 ||
                req.body.accomodation.length === 0 ||
                req.body.staff.length === 0 ||
                req.body.authority.length === 0) {
                throw new Error("Missed one value. Use the timeline and fill all 3 sets of questions!")
            }
            let application = new ApplicationMongoose({
                proof: null,
                staffID: req.session.user._id,
                applicationStatus: "Submitted",
                staffName: req.session.user.name,
                staffPTJType: req.session.user.PTJType,
                staffPTJName: req.session.user.PTJName,
                submissionDtae: new Date().toLocaleDateString(),
                _id: uuidv4(),
                // more
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
                judgeID: null,
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

    app.get('/proof-participant', auth, async function (req: Request, res: Response, next: NextFunction) {
        let application = await ApplicationMongoose.findOne({ staffID: req.session.user._id }).lean()
        try {
            if (application !== null) {
                console.log({ application })
                if (application.proof !== null) {

                    let proof = await s3.getSignedUrl('getObject', {
                        Bucket: process.env.Bucket_Name,
                        Key: application.proof,
                    })
                    res.render('participant/proof', {
                        application,
                        proof,
                        nav,
                        signInStatus: req.session.user.signInStatus
                    });
                }
                else {
                    res.render('participant/proof', {
                        application,
                        nav,
                        signInStatus: req.session.user.signInStatus
                    });
                }
            }
            else throw new Error("No application submitted yet");
        }
        catch (err) {
            res.render('participant/proof', {
                warning: err,
                nav,
                signInStatus: req.session.user.signInStatus
            });
        }
    });

    app.post('/upload-proof/:id', auth, uploadS3.single('inputFile'), async (req: Request, res: Response, next: NextFunction) => {
        let file = req.file as Express.MulterS3.File
        console.log({ file: req.file, body: req.body.inputFile })
        if (file)
            await ApplicationMongoose.findOneAndUpdate({ staffID: req.session.user._id }, { proof: file.key })
        // res.json({ file })
        res.redirect('/proof-participant')
    })


}