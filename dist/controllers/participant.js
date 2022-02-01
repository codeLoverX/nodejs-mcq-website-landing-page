"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Evaluation_1 = require("../db/models/Evaluation");
const Application_1 = require("../db/models/Application");
const auth_1 = require("../middleware/auth");
const keyRename_1 = require("../helpers/keyRename");
const formLables_1 = require("../db/formLables");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
module.exports = function (app) {
    let nav = [
        { name: "Profile", url: "/home-participant" },
        { name: "Application Submission", url: "/application-submission" },
        { name: "Logout", url: "/logout" }
    ];
    app.get('/home-participant', auth_1.auth, function (req, res, next) {
        let user = Object.assign({}, req.session.user);
        delete user._id;
        delete user.__v;
        delete user.passWord;
        res.render('participant/home', {
            user: (0, keyRename_1.keyRenameObject)(user, 'user'),
            nav,
            signInStatus: req.session.user.signInStatus
        });
    });
    app.get('/application-submission', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let user = Object.assign({}, req.session.user);
        let newApplication = false;
        try {
            let application = yield Application_1.ApplicationMongoose.findOne({ staffID: user._id }).lean();
            if (application === null) {
                newApplication = true;
                application = new Application_1.ApplicationMongoose({
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
                }).toObject();
            }
            let { evaluationPoints } = application;
            delete application.__v;
            delete application.createdAt;
            delete application.updatedAt;
            delete application.evaluationPoints;
            res.render('participant/application-submission', {
                application: (0, keyRename_1.keyRenameObject)(application, 'application'),
                nav,
                signInStatus: req.session.user.signInStatus,
                evaluationPoints,
                newApplication,
                formLabel: formLables_1.formLabel,
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
    }));
    app.post('/application-submission', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log({ filled: req.body.numberOfLocalVisitors.length, nonFilled: req.body.toilet.length, value: req.body.toilet });
            if (req.body.numberOfLocalVisitors.length === 0 ||
                req.body.funding.length === 0 ||
                req.body.ratings.length === 0 ||
                req.body.numberOfForeignVisitors.length === 0 ||
                req.body.toilet.length === 0 ||
                req.body.plumbing === 0 ||
                req.body.accomodation.length === 0 ||
                req.body.staff.length === 0 ||
                req.body.authority.length === 0) {
                throw new Error("Missed one value. Use the timeline and fill all 3 sets of questions!");
            }
            let application = new Application_1.ApplicationMongoose({
                applicationReff: req.body.applicationReff,
                applicationStatus: "Submitted",
                staffID: req.session.user._id,
                submissionDtae: new Date().toLocaleDateString(),
                _id: uuidv4(),
                // more
                programName: req.body.programName,
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
            });
            yield application.save();
            let evaluation = new Evaluation_1.EvaluationMongoose({
                applicationID: application._id,
                _id: uuidv4(),
                evaluationDateTime: new Date().toLocaleDateString(),
                judgeID: "judge",
                markEachElements: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                rank: null,
                result: "",
                TotalMark: 0,
            });
            yield evaluation.save();
            let applicationObject = application.toObject();
            delete applicationObject.__v;
            res.redirect('/application-submission');
        }
        catch (err) {
            res.render('participant/application-submission', {
                warning: err,
                application: {},
                nav,
                signInStatus: req.session.user.signInStatus
            });
        }
    }));
};
