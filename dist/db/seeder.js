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
exports.seeder = void 0;
const samples_1 = require("./samples");
const Evaluation_1 = require("./models/Evaluation");
const User_1 = require("./models/User");
const Application_1 = require("./models/Application");
function seeder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Evaluation_1.EvaluationMongoose.deleteMany();
            yield User_1.UserMongoose.deleteMany();
            yield Application_1.ApplicationMongoose.deleteMany();
        }
        catch (err) {
            return { failed: false };
        }
        try {
            let { application, evaluation, participant, judge, organizer } = yield (0, samples_1.default)();
            for (let currParticipant of participant)
                yield currParticipant.save();
            for (let currJudge of judge)
                yield currJudge.save();
            for (let currOrganizer of organizer)
                yield currOrganizer.save();
            for (let currApplication of application)
                yield currApplication.save();
            for (let currEvaluation of evaluation)
                yield currEvaluation.save();
            return { application, participant, judge, organizer, evaluation };
        }
        catch (err) {
            return { failed: true, one: 2, err };
        }
    });
}
exports.seeder = seeder;
