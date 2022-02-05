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
const User_1 = require("../db/models/User");
const Application_1 = require("../db/models/Application");
const { v4: uuidv4 } = require('uuid');
const auth_1 = require("../middleware/auth");
const methodOverride = require('method-override');
const keyRename_1 = require("../helpers/keyRename");
const formLables_1 = require("../db/formLables");
class Condition {
    constructor(signedIn, completeApplication, completeProof) {
        this.signedIn = signedIn;
        this.completeApplication = completeApplication;
        this.completeProof = completeProof;
    }
    get fullTable() {
        return [this.signedIn, this.completeApplication, this.completeProof];
    }
    isSignedIn(req) {
        this.signedIn = req.session.user !== null;
        return this.signedIn;
    }
    isCompleteApplication(application) {
        if (application)
            this.completeApplication = application.applicationStatus !== "Started";
        return this.completeApplication;
    }
    isCompleteProof(application) {
        if (application)
            this.completeProof = application.proof !== null;
        return this.completeProof;
    }
}
module.exports = function (app) {
    let nav = [
        { name: "Profile", url: "/home-organizer" },
        { name: "View Applications", url: "/all-applications-organizer" },
        { name: "Logout", url: "/logout" }
    ];
    app.get('/home-organizer', auth_1.auth, function (req, res, next) {
        let user = Object.assign({}, req.session.user);
        delete user._id;
        delete user.__v;
        delete user.passWord;
        res.render('organizer/home', {
            user: (0, keyRename_1.keyRenameObject)(user, 'user'),
            nav,
            signInStatus: req.session.user.signInStatus
        });
    });
    app.get('/all-applications-organizer', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let application = yield Application_1.ApplicationMongoose.find({ applicationStatus: { $ne: 'rejected' } }).lean();
        let judge = yield User_1.UserMongoose.find({ signInStatus: 'judge' }).lean();
        let staffName = [];
        for (let i = 0; i < application.length; i++) {
            delete application[i].__v;
            delete application[i].createdAt;
            delete application[i].updatedAt;
            delete application[i].evaluationPoints;
            staffName.push(application[i].staffName);
            application[i] = (0, keyRename_1.keyRenameObject)(application[i], 'application');
        }
        res.render('organizer/all-applications', {
            nav,
            application,
            signInStatus: req.session.user.signInStatus,
            formLabel: formLables_1.formLabel,
            judge: encodeURIComponent(JSON.stringify(judge)),
            staffName: encodeURIComponent(JSON.stringify(staffName))
        });
    }));
    app.post('/edit-application/:id', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let application = new Application_1.ApplicationMongoose();
        function reject(id) {
            return __awaiter(this, void 0, void 0, function* () {
                let application = yield Application_1.ApplicationMongoose.findByIdAndUpdate(id, { applicationStatus: 'rejected' });
                return application;
            });
        }
        function accept(id) {
            return __awaiter(this, void 0, void 0, function* () {
                let application = yield Application_1.ApplicationMongoose.findByIdAndUpdate(id, { applicationStatus: 'accepted' });
                return application;
            });
        }
        if (req.body.status === "reject")
            application = yield reject(req.params.id);
        else if (req.body.status === "accept")
            application = yield accept(req.params.id);
        else if (req.body.status === "auto") {
            application = yield Application_1.ApplicationMongoose.findById(req.params.id);
            let condition = new Condition(false, false, false);
            condition.isSignedIn(req);
            condition.isCompleteApplication(application);
            condition.isCompleteProof(application);
            switch (condition.fullTable.join(' ')) {
                case 'true true true':
                    accept(req.params.id);
                    break;
                case 'true true false':
                case 'true false true':
                case 'false true true':
                case 'true false false':
                case 'false false true':
                case 'false true false':
                case 'false false false':
                    reject(req.params.id);
                    break;
                default:
                    reject(req.params.id);
                    break;
            }
        }
        res.redirect('/all-applications-organizer');
    }));
    app.post('/assign-judge/:id', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log({ status: req.body.status });
        let evaluation = new Evaluation_1.EvaluationMongoose();
        evaluation = yield Evaluation_1.EvaluationMongoose.findOneAndUpdate({ applicationID: req.params.id }, { judgeID: req.body.judgeName }, { new: true });
        res.redirect('/all-applications-organizer');
    }));
};
