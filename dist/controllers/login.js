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
const User_1 = require("../db/models/User");
const seeder_1 = require("../db/seeder");
const { v4: uuidv4 } = require('uuid');
module.exports = function (app) {
    app.get('/works', (req, res, next) => res.json({ success: true, req: req.header.length }));
    app.get('/', (req, res, next) => {
        res.render('landing');
    });
    app.get('/login', (req, res, next) => {
        res.render('login');
    });
    app.get('/login-demo', (req, res, next) => {
        res.render('login-demo');
    });
    app.get('/signup', (req, res, next) => {
        res.render('signup');
    });
    app.get('/reset', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        res.json(yield (0, seeder_1.seeder)());
    }));
    // Logout endpoint
    app.get('/logout', function (req, res, next) {
        req.session.destroy();
        res.render('login', { success: "Logged out" });
    });
    app.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let IsNoWarning = (req.body.username && req.body.password) || req.body.usernameNoPassword;
        if (IsNoWarning) {
            let user = new User_1.UserMongoose();
            try {
                if (!req.body.usernameNoPassword)
                    user = yield User_1.UserMongoose.findOne({ userName: `@${req.body.username}`, passWord: req.body.password });
                else {
                    user = yield User_1.UserMongoose.findOne({ userName: `@${req.body.usernameNoPassword}` });
                }
                req.session.user = user;
                function executesignin() {
                    res.render('signin', { warning: "Incorrect password or username" });
                }
                function executehomeparticipant() {
                    res.redirect('/home-participant');
                }
                function executehomejudge() {
                    res.redirect('/home-judge');
                }
                function executehomeorganizer() {
                    res.redirect('/home-organizer');
                }
                function executenousernameorpassword() {
                    res.render('signin', { warning: "No login or usertype" });
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
    }));
    app.post('/signup', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body.userType === "judge") {
                let judge = new User_1.UserMongoose({
                    address: req.body.address,
                    passWord: req.body.passWord,
                    signInStatus: req.body.userType,
                    email: req.body.email,
                    userType: req.body.name,
                    name: req.body.name,
                    userName: req.body.userName,
                    judgePosition: req.body.judgePosition,
                    _id: uuidv4()
                });
                yield judge.save();
            }
            if (req.body.userType === "organizer") {
                let organizer = new User_1.UserMongoose({
                    address: req.body.address,
                    passWord: req.body.passWord,
                    signInStatus: req.body.userType,
                    email: req.body.email,
                    userType: req.body.name,
                    name: req.body.name,
                    userName: req.body.userName,
                    organizerPosition: req.body.organizerPosition,
                    _id: uuidv4()
                });
                organizer.save();
            }
            if (req.body.userType === "judge") {
                let participant = new User_1.UserMongoose({
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
                });
                participant.save();
            }
            res.render('login', { success: "Successful login!" });
        }
        catch (err) {
            res.render('signup', { warning: err });
        }
    }));
};
