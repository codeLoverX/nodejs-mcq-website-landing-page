import { EvaluationMongoose } from "./models/Evaluation";
import { UserMongoose } from "./models/User";
import { ApplicationMongoose } from "./models/Application";
const { v4: uuidv4 } = require('uuid');

export default async function seedDatabase() {

    let judge = [
        await new UserMongoose({
            email: "johanna@upm.my",
            passWord: "123456",
            address: "8 & 20 Jalan Susur 1, Off Jalan Tun Abdul Razak, 80000 Johor Bahru",
            signInStatus: "judge",
            userName: "@johanna",
            name: "Dr Johanna",
            judgePosition: "Head Judge",
            _id: uuidv4()
        }),
        await new UserMongoose({
            email: "adila@utm.my",
            passWord: "123456",
            address: "8 & 20 Jalan Susur 1, Off Jalan Tun Abdul Razak, 80000 Johor Bahru",
            signInStatus: "judge",
            userName: "@adila",
            name: "Dr Adila",
            judgePosition: "Co-Judge",
            _id: uuidv4()
        })]

    let organizer = [
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "organizer",
            userName: "@wan",
            email: "wan@grad.utm.my",
            _id: uuidv4(),
            address: "Jalan Tun Abdul Razak, Wadi Hana, 80000 Johor Bahru, Johor,",
            contact: "+601149818334",
            name: "Dr Wan",
            organizerPosition: "President",
        })
    ]

    let participant = [
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "participant",
            userName: "@shafayet",
            _id: uuidv4(),
            name: "Shafayet Hossain",
            PTJType: "Faculty",
            PTJName: "School of Computing",
            address: "Melana Apartment @ Taman Universiti - Skudai, Johor Bahru, Johor",
            email: "shafayet@grad.utm.my",
        }),
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "participant",
            userName: "@monir",
            _id: uuidv4(),
            name: "Monir Islam",
            PTJType: "Off-campus residence",
            PTJName: "Melana and Melawis",
            address: "Melana Apartment @ Taman Universiti - Skudai, Johor Bahru, Johor",
            email: "monir@grad.utm.my",
            StaffPhoneNo: "+601134808974",
        }),
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "participant",
            userName: "@ridwan",
            _id: uuidv4(),
            name: "Ridwan Bin Monjur",
            PTJType: "On-campus residence",
            PTJName: "KLG Campus Residence",
            address: "Taman Sri Pulai, 81110 Skudai, Johor, Malaysia",
            email: "ridwan@grad.utm.my",
            StaffPhoneNo: "+601134808974",
        }),
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "participant",
            userName: "@atiqah",
            _id: uuidv4(),
            name: "Nur Atiqah",
            PTJType: "On-campus residence",
            PTJName: "Kolej Tun Dato Ismail",
            address: "M01, 81310 Skudai, Johor Bahru, Johor, Malaysia",
            email: "atiqah@grad.utm.my",
            StaffPhoneNo: "+601134808974",
        }),
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "participant",
            userName: "@afifah",
            _id: uuidv4(),
            name: "Afifah binti Mohd Dalih",
            PTJType: "Campus club",
            PTJName: "PERSAKA UTM",
            address: "M01, 81310 Skudai, Johor Bahru, Johor, Malaysia",
            email: "afifah@grad.utm.my",
            StaffPhoneNo: "+601134808974",
        }),
        await new UserMongoose({
            passWord: "123456",
            signInStatus: "participant",
            userName: "@hamidah",
            _id: uuidv4(),
            name: "Siti Hamidah",
            PTJType: "Campus Club",
            PTJName: "IEEE Research conference",
            address: "M01, 81310 Skudai, Johor Bahru, Johor, Malaysia",
            email: "hamidah@grad.utm.my",
            StaffPhoneNo: "+601134808974",
        })]

    let application = [
        await  new ApplicationMongoose({
            applicationStatus: "Submitted",
            staffID: participant[0]._id,
            staffName: participant[0].name,
            staffPTJType: participant[0].PTJType,
            staffPTJName: participant[0].PTJName,
            submissionDtae: new Date("2022-1-18").toLocaleDateString(),
            evaluationPoints: {
                numberOfLocalVisitors: "Yes",
                funding: "Yes",
                ratings: "Yes",
                numberOfForeignVisitors: "Yes",
                toilet: "Excellent",
                plumbing: "Excellent",
                accomodation: "Good",
                staff: "Excellent",
                authority: "Good"
            },
            proof: null,
            _id: uuidv4()
        }),
        await new ApplicationMongoose({
            applicationStatus: "Submitted",
            staffID: participant[2]._id,
            staffName: participant[2].name,
            staffPTJType: participant[2].PTJType,
            staffPTJName: participant[2].PTJName,
            submissionDtae: new Date("2022-1-18").toLocaleDateString(),
            evaluationPoints: {
                numberOfLocalVisitors: "Yes",
                funding: "Yes",
                ratings: "Yes",
                numberOfForeignVisitors: "Yes",
                toilet: "Excellent",
                plumbing: "Excellent",
                accomodation: "Good",
                staff: "Excellent",
                authority: "Good"
            },
            proof: null,
            _id: uuidv4()
        }),
        await new ApplicationMongoose({
            applicationStatus: "Submitted",
            staffID: participant[3]._id,
            staffName: participant[3].name,
            staffPTJType: participant[3].PTJType,
            staffPTJName: participant[3].PTJName,
            submissionDtae: new Date("2022-1-18").toLocaleDateString(),
            evaluationPoints: {
                numberOfLocalVisitors: "Yes",
                funding: "Yes",
                ratings: "Yes",
                numberOfForeignVisitors: "Yes",
                toilet: "Excellent",
                plumbing: "Excellent",
                accomodation: "Good",
                staff: "Excellent",
                authority: "Good"
            },
            proof: null,
            _id: uuidv4()
        }),
        ]
        console.log(application[2])
    let evaluation = [
        await new EvaluationMongoose({
            applicationID: application[0]._id,
            _id: uuidv4(),
            evaluationDateTime: new Date('2022-1-17').toLocaleDateString(),
            judgeID: judge[0]._id,
            markEachElements: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            rank: null,
            result: null,
            TotalMark: 0,
        }),
        await new EvaluationMongoose({
            applicationID: application[1]._id,
            _id: uuidv4(),
            evaluationDateTime: new Date('2022-1-17').toLocaleDateString(),
            judgeID: judge[0]._id,
            markEachElements: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            rank: null,
            result: null,
            TotalMark: 0,
        }),
        await new EvaluationMongoose({
            applicationID: application[2]._id,
            _id: uuidv4(),
            evaluationDateTime: new Date('2022-1-17').toLocaleDateString(),
            judgeID: judge[0]._id,
            markEachElements: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            rank: null,
            result: null,
            TotalMark: 0,
        }),
        
    ]
    console.log(evaluation[2])

    return {
        participant, judge, organizer, application, evaluation
    }
}
