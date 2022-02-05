import seedDatabase from "./samples";

import { EvaluationMongoose } from "./models/Evaluation";
import { UserMongoose } from "./models/User";
import { ApplicationMongoose } from "./models/Application";
export async function seeder() {
    try {
        await EvaluationMongoose.deleteMany()
        await UserMongoose.deleteMany()
        await ApplicationMongoose.deleteMany()
    }
    catch (err) {
        return { failed: false }
    }

    try {
        let { application, evaluation, participant, judge, organizer } = await seedDatabase()
        for (let currParticipant of participant)
            await currParticipant.save()
        for (let currJudge of judge)
            await currJudge.save()
        for (let currOrganizer of organizer)
            await currOrganizer.save()
        for (let currApplication of application)
            await currApplication.save()
        for (let currEvaluation of evaluation)
            await currEvaluation.save()
        return { application, participant, judge, organizer, evaluation }

    }
    catch (err) {

        return { failed: true, one: 2, err }
    }




}