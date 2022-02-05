"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationMongoose = void 0;
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    staffID: String,
    staffPTJName: String,
    applicationStatus: String,
    submissionDtae: Date,
    staffName: String,
    staffPTJType: String,
    _id: String,
    evaluationPoints: {
        numberOfLocalVisitors: String,
        funding: String,
        ratings: String,
        numberOfForeignVisitors: String,
        toilet: String,
        plumbing: String,
        accomodation: String,
        staff: String,
        authority: String,
    },
    proof: String
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true, timestamps: true });
const ApplicationMongoose = (0, mongoose_1.model)('Application', ApplicationSchema);
exports.ApplicationMongoose = ApplicationMongoose;
// exports 'Product' interface
