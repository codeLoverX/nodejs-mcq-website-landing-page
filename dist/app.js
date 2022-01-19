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
const express = require("express");
const uuid_1 = require("uuid");
const dotenv = require("dotenv");
const session = require('express-session');
var exphbs = require('express-handlebars');
const path = require("path");
const methodOverride = require('method-override');
dotenv.config({ path: './env/config.env' });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'handlebars');
app.set('views', './dist/views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
}));
app.engine('handlebars', exphbs({
    helpers: {
        math: function (lvalue, operator, rvalue) {
            let lvalue_ = parseFloat(lvalue);
            let rvalue_ = parseFloat(rvalue);
            return {
                "+": lvalue_ + rvalue_,
                "-": lvalue_ - rvalue_,
                "*": lvalue_ * rvalue_,
                "/": lvalue_ / rvalue_,
                "%": lvalue_ % rvalue_
            }[operator];
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));
const db_1 = require("./db");
const seeder_1 = require("./seeder");
const User_1 = require("./schema/User");
const Application_1 = require("./schema/Application");
(0, db_1.connectDB)();
let auth = (req, res, next) => {
    if (req.session.user)
        return next();
    else
        res.render('login', { warning: "Login first" });
};
app.get('/works', (req, res, next) => res.json({ success: true, req: req.header.length }));
app.get('/', (req, res, next) => {
    res.render('login');
});
app.get('/reset', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, seeder_1.seeder)());
}));
// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login', { success: "Logged out" });
});
app.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let IsNoWarning = (req.body.username && req.body.password) || req.body.usertype;
    if (IsNoWarning) {
        let user = new User_1.UserMongoose();
        try {
            if (!req.body.usertype)
                user = yield User_1.UserMongoose.findOne({ userName: req.body.username, passWord: req.body.password });
            else {
                user = yield User_1.UserMongoose.findOne({ _id: req.body.usertype });
            }
            console.log({ user });
            if (user === null) {
                throw new Error('Null user. Login or password is incorrect!');
            }
            req.session.user = user;
        }
        catch (err) {
            res.render('login', { warning: err });
        }
        console.log(user.signUpStatus);
        if (user.signInStatus === "participant")
            res.redirect('/home-participant');
        else if (user.signInStatus === "judge")
            res.redirect('/home-judge');
        else
            res.redirect('/home-organizer');
    }
    else {
        res.render('login', { warning: "No login or usertype" });
    }
}));
app.get('/home-participant', auth, function (req, res) {
    let user = Object.assign({}, req.session.user);
    delete user._id;
    delete user.__v;
    console.log(typeof user);
    console.log({ user });
    res.render('home-participant', {
        user, nav: [
            { name: "Profile", url: "/home-participant" },
            { name: "Application Submission", url: "/application-submission" },
            { name: "Logout", url: "/logout" }
        ]
    });
});
app.get('/application-submission', auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = Object.assign({}, req.session.user);
    try {
        let application = yield Application_1.ApplicationMongoose.findOne({ staffID: user._id }).lean();
        console.log({ application, id: user._id });
        if (application === null) {
            application = new Application_1.ApplicationMongoose({
                applicationStatus: "Not submitted",
                // more
                programName: null,
                numberOfLocalVisitors: null,
                funding: null,
                ratings: null,
                numberOfForeignVisitors: null,
            }).toObject();
        }
        delete application.__v;
        console.log({ application, user });
        res.render('application-submission', {
            application, nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }
            ]
        });
    }
    catch (err) {
        res.render('application-submission', {
            warning: "Problems loading. Try again",
            application: {}, nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }
            ]
        });
    }
}));
app.post('/application-submission', auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = Object.assign({}, req.session.user);
    try {
        let application = new Application_1.ApplicationMongoose({
            applicationReff: req.body.applicationReff,
            applicationStatus: "Submitted",
            staffID: req.session.user._id,
            submissionDtae: new Date().toString(),
            _id: (0, uuid_1.v4)(),
            // more
            programName: req.body.programName,
            numberOfLocalVisitors: req.body.numberOfLocalVisitors,
            funding: req.body.funding,
            ratings: req.body.ratings,
            numberOfForeignVisitors: req.body.numberOfForeignVisitors,
        });
        yield application.save();
        let applicationObject = application.toObject();
        delete applicationObject.__v;
        res.render('application-submission', {
            application: applicationObject,
            success: "Successful application",
            nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }
            ]
        });
    }
    catch (err) {
        res.render('application-submission', {
            warning: "Problems loading. Try again",
            application: {}, nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }
            ]
        });
    }
}));
app.get('/home-judge', auth, function (req, res) {
    let user = Object.assign({}, req.session.user);
    delete user._id;
    delete user.__v;
    console.log(typeof user);
    console.log({ user });
    res.render('home-participant', {
        user, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "View applications", url: "/all-applications" },
            { name: "Logout", url: "/logout" }
        ]
    });
});
app.get('/all-applications', auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = Object.assign({}, req.session.user);
    let usertype = "";
    if (user.signInStatus === "judge") {
        usertype = "judge";
    }
    else if (user.signInStatus === "organizer") {
        usertype = "organizer";
    }
    let application = yield Application_1.ApplicationMongoose.find({}).lean();
    console.log({ application });
    res.render('all-applications', {
        usertype,
        application, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications" },
            { name: "Logout", url: "/logout" }
        ]
    });
}));
app.get('/get-application-judge', auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = Object.assign({}, req.session.user);
    let usertype = "";
    if (user.signInStatus === "judge") {
        usertype = "judge";
    }
    else if (user.signInStatus === "organizer") {
        usertype = "organizer";
    }
    let application = yield Application_1.ApplicationMongoose.find({});
    console.log(typeof application);
    console.log({ application });
    res.render('all-applications', {
        usertype,
        application, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications" },
            { name: "Logout", url: "/logout" }
        ]
    });
}));
app.get('/get-application-organizer', auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = Object.assign({}, req.session.user);
    let usertype = "";
    if (user.signInStatus === "judge") {
        usertype = "judge";
    }
    else if (user.signInStatus === "organizer") {
        usertype = "organizer";
    }
    let application = yield Application_1.ApplicationMongoose.find({});
    console.log(typeof application);
    console.log({ application });
    res.render('all-applications', {
        usertype,
        application, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications" },
            { name: "Logout", url: "/logout" }
        ]
    });
}));
app.get('/home-organizer', auth, function (req, res) {
    let user = Object.assign({}, req.session.user);
    delete user._id;
    delete user.__v;
    console.log(typeof user);
    console.log({ user });
    res.render('home-participant', {
        user, nav: [
            { name: "Profile", url: "/home-organizer" },
            { name: "View Applications", url: "/all-applications" },
            { name: "Logout", url: "/logout" }
        ]
    });
});
// app.use('/api/v1', routesAuth)
// app.get('/api/v1/resetData', function (req: Request, res: Response){
//     resetData()
//     res.json({success: true}
// })
app.listen(process.env.PORT || 5000, function () {
    console.log('Hello my friend'); // outputs green text
});
module.exports = app;
