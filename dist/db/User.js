"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoose = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    passWord: String,
    signInStatus: String,
    signUpStatus: String,
    userName: String,
    // organizer
    address: String,
    contact: String,
    fullName: String,
    organizerPosition: String,
    email: String,
    // judge
    name: String,
    // participant
    fName: String,
    lName: String,
    PTJType: String,
    staffAddress: String,
    StaffEmail: String,
    StaffPhoneNo: String,
    _id: String
});
const UserMongoose = (0, mongoose_1.model)('User', schema);
exports.UserMongoose = UserMongoose;
