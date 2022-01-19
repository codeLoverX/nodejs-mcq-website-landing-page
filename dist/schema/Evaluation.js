"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationMongoose = void 0;
const mongoose_1 = require("mongoose");
// not written in the docs but must be written!!!
// ** extends Document **
const EvaluationSchema = new mongoose_1.Schema({
    applicationID: {
        type: String, ref: 'Application'
    },
    evaluationDateTime: Date,
    judgeID: String,
    markEachElements: [Number],
    rank: Number,
    result: String,
    TotalMark: Number,
    _id: String
}, 
// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
//  specified in our schema do not get saved to the db.
{ strict: true });
const EvaluationMongoose = (0, mongoose_1.model)('Evaluation', EvaluationSchema);
exports.EvaluationMongoose = EvaluationMongoose;
// exports 'Product' interface
