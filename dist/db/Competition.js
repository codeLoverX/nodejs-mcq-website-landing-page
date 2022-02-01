"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionMongoose = void 0;
const mongoose_1 = require("mongoose");
// not written in the docs but must be written!!!
// ** extends Document **
const CompetitionSchema = new mongoose_1.Schema({
    description: String,
    endDate: Date,
    invitation: String,
    programID: String,
    programName: String,
    startDate: Date,
    _id: String
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true });
const CompetitionMongoose = (0, mongoose_1.model)('Competition', CompetitionSchema);
exports.CompetitionMongoose = CompetitionMongoose;
// exports 'Product' interface
