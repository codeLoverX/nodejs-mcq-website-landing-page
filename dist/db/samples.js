"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Competition_1 = require("./models/Competition");
const Evaluation_1 = require("./models/Evaluation");
const User_1 = require("./models/User");
const Application_1 = require("./models/Application");
function seedDatabase() {
    let application = new Application_1.ApplicationMongoose({
        applicationReff: "competition1",
        applicationStatus: "Submitted",
        staffID: "participant1",
        submissionDtae: new Date("2022-1-18").toLocaleDateString(),
        programName: "Engineering Research Conference (UTM)",
        evaluationPoints: {
            numberOfLocalVisitors: 150,
            funding: 10000,
            ratings: 4.5,
            numberOfForeignVisitors: 50,
            //
            toilet: "Excellent",
            plumbing: "Excellent",
            accomodation: "Good",
            // 
            staff: "Excellent",
            authority: "Good"
        },
        _id: "application1"
    });
    let competition = new Competition_1.CompetitionMongoose({
        description: "Engineering Research Conference (UTM) is an upcoming research conference everyone should keep an eye on!",
        endDate: new Date('2022-4-17').toLocaleDateString(),
        startDate: '2022-1-17',
        invitation: "/createAccountHere/XYAA",
        _id: "competition1"
    });
    let evaluation = new Evaluation_1.EvaluationMongoose({
        applicationID: application._id,
        _id: "evaluation1",
        evaluationDateTime: new Date('2022-1-17').toLocaleDateString(),
        judgeID: "judge",
        markEachElements: [10, 10, 8, 9, 10, 10, 5, 10, 5],
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
    return {
        participant1, participant2, judge, organizer, application, evaluation, competition
    };
}
exports.default = seedDatabase;
