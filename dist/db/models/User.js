"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoose = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    passWord: String,
    signInStatus: String,
    userName: String,
    address: String,
    email: String,
    name: String,
    // organizer
    contact: String,
    organizerPosition: String,
    // judge
    judgePosition: String,
    // participant
    PTJType: String,
    PTJName: String,
    _id: String
});
const UserMongoose = (0, mongoose_1.model)('User', schema);
exports.UserMongoose = UserMongoose;
