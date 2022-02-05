"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionMongoose = void 0;
const mongoose_1 = require("mongoose");
const dateFormat_1 = require("../../helpers/dateFormat");
// not written in the docs but must be written!!!
// ** extends Document **
const CompetitionSchema = new mongoose_1.Schema({
    description: String,
    endDate: { type: Date, get: dateFormat_1.taskDate },
    invitation: String,
    programID: String,
    startDate: { type: Date, get: dateFormat_1.taskDate },
    _id: String
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true });
const CompetitionMongoose = (0, mongoose_1.model)('Competition', CompetitionSchema);
exports.CompetitionMongoose = CompetitionMongoose;
// exports 'Product' interface
