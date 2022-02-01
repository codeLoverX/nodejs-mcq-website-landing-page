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
const methodOverride = require('method-override');
module.exports = function (app) {
    app.get('/works', (req, res, next) => res.json({ success: true, req: req.header.length }));
    app.get('/', (req, res, next) => {
        res.render('login');
    });
    app.get('/reset', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        res.json(yield (0, seeder_1.seeder)());
    }));
    // Logout endpoint
    app.get('/logout', function (req, res, next) {
        req.session.destroy();
        res.render('login', { success: "Logged out" });
    });
    app.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let IsNoWarning = (req.body.username && req.body.password) || req.body.usertype;
        if (IsNoWarning) {
            let user = new User_1.UserMongoose();
            try {
                if (!req.body.usertype)
                    user = yield User_1.UserMongoose.findOne({ userName: req.body.username, passWord: req.body.password });
                else {
                    user = yield User_1.UserMongoose.findOne({ _id: req.body.usertype });
                }
                if (user === null) {
                    throw new Error('Null user. Login or password is incorrect!');
                }
                req.session.user = user;
            }
            catch (err) {
                res.render('login', { warning: err });
            }
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
};
