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
const { v4: uuidv4 } = require('uuid');
const auth_1 = require("../middleware/auth");
const methodOverride = require('method-override');
const keyRename_1 = require("../helpers/keyRename");
const formLables_1 = require("../db/formLables");
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
        let application = yield Application_1.ApplicationMongoose.find({}).lean();
        let evaluation = yield Evaluation_1.EvaluationMongoose.find({}).populate('applicationID').lean();
        for (let i = 0; i < application.length; i++) {
            delete application[i].__v;
            delete application[i].createdAt;
            delete application[i].updatedAt;
            delete application[i].evaluationPoints;
        }
        res.render('organizer/all-applications', {
            nav,
            evaluation,
            application,
            signInStatus: req.session.user.signInStatus,
            formLabel: formLables_1.formLabel
        });
    }));
    app.post('/delete-application/:id', auth_1.auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let application = yield Application_1.ApplicationMongoose.findByIdAndDelete(req.params.id);
        res.redirect('/all-applications-organizer');
    }));
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
};
