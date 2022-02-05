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
module.exports = function (app) {
    let nav = [
        { name: "Profile", url: "/home-judge" },
        { name: "View applications", url: "/all-applications-judge" },
        { name: "Logout", url: "/logout" }
    ];
    app.get('/home-judge', auth_1.auth, function (req, res, next) {
        let user = Object.assign({}, req.session.user);
        delete user._id;
        delete user.__v;
        delete user.passWord;
        res.render('judge/home', {
            user: (0, keyRename_1.keyRenameObject)(user, 'user'), nav, signInStatus: req.session.user.signInStatus
        });
    });
    app.get('/all-applications-judge', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let application = yield Application_1.ApplicationMongoose.find({}).lean();
        let evaluation = yield Evaluation_1.EvaluationMongoose.find({ judgeID: req.session.user._id }).populate('applicationID').lean();
        // res.json({evaluation})
        for (let i = 0; i < application.length; i++) {
            application[i].formLabel = formLables_1.formLabel;
            // evaluation[i].applicationID.formLabel = formLabel
        }
        for (let currApplication of application) {
            delete currApplication.__v;
            delete currApplication.createdAt;
        }
        res.render('judge/all-applications', {
            nav,
            evaluation,
            application,
            signInStatus: req.session.user.signInStatus,
            formLabel: formLables_1.formLabel
        });
    }));
    // deleteApplication
    app.post('/post-evaluation/:id', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let funding = parseFloat(req.body.funding);
        let ratings = parseFloat(req.body.ratings);
        let numberOfForeignVisitors = parseFloat(req.body.numberOfForeignVisitors);
        let numberOfLocalVisitors = parseFloat(req.body.numberOfLocalVisitors);
        let toilet = parseFloat(req.body.toilet);
        let accomodation = parseFloat(req.body.accomodation);
        let plumbing = parseFloat(req.body.plumbing);
        let staff = parseFloat(req.body.staff);
        let authority = parseFloat(req.body.authority);
        let evaluation = yield Evaluation_1.EvaluationMongoose.findByIdAndUpdate(req.params.id, {
            applicationStatus: 'Submitted',
            markEachElements: [funding, ratings, numberOfForeignVisitors, numberOfLocalVisitors,
                toilet, accomodation, plumbing,
                staff, authority
            ],
            TotalMark: funding + ratings + numberOfForeignVisitors + numberOfLocalVisitors +
                toilet + accomodation + plumbing +
                staff + authority
        });
        res.redirect('/all-applications-judge');
    }));
};
