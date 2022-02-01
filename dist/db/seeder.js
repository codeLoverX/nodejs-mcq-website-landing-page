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
const Competition_1 = require("./models/Competition");
const Evaluation_1 = require("./models/Evaluation");
const User_1 = require("./models/User");
const Application_1 = require("./models/Application");
function seeder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Competition_1.CompetitionMongoose.deleteMany();
            yield Evaluation_1.EvaluationMongoose.deleteMany();
            yield User_1.UserMongoose.deleteMany();
            yield Application_1.ApplicationMongoose.deleteMany();
        }
        catch (err) {
            return { failed: true };
        }
        try {
            let { application, competition, evaluation, participant1, participant2, judge, organizer } = (0, samples_1.default)();
            // application1._id="application1"
            yield competition.save();
            yield evaluation.save();
            yield participant1.save();
            yield participant2.save();
            yield judge.save();
            yield organizer.save();
            yield application.save();
            return { application, competition, evaluation, participant1, participant2, judge, organizer };
        }
        catch (err) {
            return { failed: true };
        }
    });
}
exports.seeder = seeder;
