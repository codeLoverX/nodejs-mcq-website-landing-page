import seedDatabase from "./samples";

import { CompetitionMongoose } from "./models/Competition";
import { EvaluationMongoose } from "./models/Evaluation";
import { UserMongoose } from "./models/User";
import { ApplicationMongoose } from "./models/Application";
export async function seeder() {
    try {
        await CompetitionMongoose.deleteMany()
        await EvaluationMongoose.deleteMany()
        await UserMongoose.deleteMany()
        await ApplicationMongoose.deleteMany()
    }
    catch (err) {
       
        return { failed: true }

    }

    try {
        let  { application, competition, evaluation, participant1, participant2, judge, organizer } = seedDatabase()
        // application1._id="application1"
        await competition.save()
        await evaluation.save()
        await participant1.save()
        await participant2.save()
        await judge.save()
        await organizer.save()
        await application.save()

        return { application, competition, evaluation, participant1, participant2, judge, organizer }

    }
    catch (err) {
        
        return { failed: true }
    }




}