import { CompetitionMongoose } from "./schema/Competition";
import { EvaluationMongoose } from "./schema/Evaluation";
import { UserMongoose } from "./schema/User";
import { ApplicationMongoose } from "./schema/Application";

export async function seeder() {
    try {
        await CompetitionMongoose.deleteMany()
        await EvaluationMongoose.deleteMany()
        await UserMongoose.deleteMany()
        await ApplicationMongoose.deleteMany()
    }
    catch (err) {
        console.log(err)
        console.log("Failed!!!")
        return { failed: true }

    }

    try {
        let application = new ApplicationMongoose({
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
        })
        let competition = new CompetitionMongoose({
            description: "Engineering Research Conference (UTM) is an upcoming research conference everyone should keep an eye on!",
            endDate: new Date('2022-4-17'),
            startDate: new Date('2022-1-17'),
            invitation: "/createAccountHere/XYAA",
            _id: "competition1"
        })
        let evaluation = new EvaluationMongoose({
            applicationID: application._id,
            _id: "evaluation1",
            evaluationDateTime: new Date('2022-1-17'),
            judgeID: "judge",
            markEachElements: [0, 10, 10, 0],
            rank: null,
            result: "Good work done!",
            TotalMark: 0,
        })
        let judge = new UserMongoose({
            passWord: "123456",
            signInStatus: "judge",
            signUpStatus: "true",
            userName: "judge",
            userType: "judge",
            // judge
            name: "Dr Johanna",
            usertype: "judge",
            _id: "judge"
        })
        let organizer = new UserMongoose({
            passWord: "123456",
            signInStatus: "organizer",
            signUpStatus: "true",
            userName: "organizer",
            email: "adila@grad.utm.my",
            _id: "organizer",
            // organizer
            address: "Jalan Tun Abdul Razak, Wadi Hana, 80000 Johor Bahru, Johor,",
            contact: "+601149818334",
            fullName: "Dr Adila",
            organizerPosition: "President",
            usertype: "organizer"

        })
        let participant1 = new UserMongoose({
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

        })
        let participant2 = new UserMongoose({
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
        })

        // application1._id="application1"
        await application.save()
        await competition.save()
        await evaluation.save()
        await participant1.save()
        await participant2.save()
        await judge.save()
        await organizer.save()
        return { application, competition, evaluation, participant1, participant2, judge, organizer }

    }
    catch (err) {
        console.log(err)
        console.log("Failed 2nd part!!!")
        return { failed: true }
    }




}