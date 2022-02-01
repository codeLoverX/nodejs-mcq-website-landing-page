"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationMongoose = void 0;
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    staffID: String,
    applicationReff: String,
    applicationStatus: String,
    submissionDtae: String,
    _id: String,
    // okay
    programName: String,
    numberOfLocalVisitors: Number,
    funding: Number,
    ratings: Number,
    numberOfForeignVisitors: Number,
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true, timestamps: false });
const ApplicationMongoose = (0, mongoose_1.model)('Application', ApplicationSchema);
exports.ApplicationMongoose = ApplicationMongoose;
// exports 'Product' interface
