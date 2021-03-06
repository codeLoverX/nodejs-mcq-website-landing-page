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
const Competition_1 = require("./db/models/Competition");
const Evaluation_1 = require("./db/models/Evaluation");
const User_1 = require("./db/models/User");
const Application_1 = require("./db/models/Application");
function seeder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Competition_1.CompetitionMongoose.deleteMany();
            yield Evaluation_1.EvaluationMongoose.deleteMany();
            yield User_1.UserMongoose.deleteMany();
            yield Application_1.ApplicationMongoose.deleteMany();
        }
        catch (err) {
            console.log(err);
            console.log("Failed!!!");
            return { failed: true };
        }
        try {
            let application = new Application_1.ApplicationMongoose({
                applicationReff: "competition1",
                applicationStatus: "Submitted",
                staffID: "participant1",
                submissionDtae: "18-1-2022",
                programName: "Engineering Research Conference (UTM)",
                numberOfLocalVisitors: 150,
                funding: 10000,
                ratings: 4.5,
                numberOfForeignVisitors: 50,
                _id: "application1"
            });
            let competition = new Competition_1.CompetitionMongoose({
                description: "Engineering Research Conference (UTM) is an upcoming research conference everyone should keep an eye on!",
                endDate: new Date('2022-4-17'),
                startDate: new Date('2022-1-17'),
                invitation: "/createAccountHere/XYAA",
                _id: "competition1"
            });
            let evaluation = new Evaluation_1.EvaluationMongoose({
                applicationID: application._id,
                _id: "evaluation1",
                evaluationDateTime: new Date('2022-1-17'),
                judgeID: "judge",
                markEachElements: [0, 0, 0, 0],
                rank: null,
                result: "Good work done!",
                TotalMark: 0,
            });
            let judge = new User_1.UserMongoose({
                passWord: "123456",
                signInStatus: "judge",
                signUpStatus: "true",
                userName: "judge",
                userType: "judge",
                // judge
                name: "Dr Johanna",
                usertype: "judge",
                _id: "judge"
            });
            let organizer = new User_1.UserMongoose({
                passWord: "123456",
                signInStatus: "organizer",
                signUpStatus: "true",
                userName: "organizer",
                email: "johanna@grad.utm.my",
                _id: "organizer",
                // organizer
                address: "Jalan Tun Abdul Razak, Wadi Hana, 80000 Johor Bahru, Johor,",
                contact: "+601149818334",
                fullName: "Dr Johanna",
                organizerPosition: "President",
                usertype: "organizer"
            });
            let participant1 = new User_1.UserMongoose({
                passWord: "123456",
                signInStatus: "participant",
                signUpStatus: "true",
                userName: "participant1",
                _id: "participant1",
                // participant
                fName: "Shafayet",
                lName: "Hossain",
                PTJType: "Event Secretary",
                staffAddress: "Melana Apartment @ Taman Universiti - Skudai, Johor Bahru, Johor",
                StaffEmail: "shafayet@grad.utm.my",
                StaffPhoneNo: "+601149818974",
            });
            let participant2 = new User_1.UserMongoose({
                passWord: "123456",
                signInStatus: "participant",
                signUpStatus: "true",
                userName: "participant2",
                _id: "participant2",
                // participant
                fName: "Monir",
                lName: "Islam",
                PTJType: "Event President",
                staffAddress: "Melana Apartment @ Taman Universiti - Skudai, Johor Bahru, Johor",
                StaffEmail: "monir@grad.utm.my",
                StaffPhoneNo: "+601134808974",
            });
            // application1._id="application1"
            yield application.save();
            yield competition.save();
            yield evaluation.save();
            yield participant1.save();
            yield participant2.save();
            yield judge.save();
            yield organizer.save();
            return { application, competition, evaluation, participant1, participant2, judge, organizer };
        }
        catch (err) {
            console.log(err);
            console.log("Failed 2nd part!!!");
            return { failed: true };
        }
    });
}
exports.seeder = seeder;
