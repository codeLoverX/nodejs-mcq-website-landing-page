// The Facade pattern concept

import { ApplicationInterface, ApplicationMongoose } from "../schema/Application"
import { CompetitionInterface, CompetitionMongoose } from "../schema/Competition"
import { EvaluationInterface, EvaluationMongoose } from "../schema/Evaluation"

class ApplicationModel {
    // A hypothetically complicated class
    async fetchAllApplications(): Promise<ApplicationInterface[]> {
        let applications = await ApplicationMongoose.find({})
        if (applications === null) applications = []
        return applications
    }
}

class CompetitionModel {
    // A hypothetically complicated class
    async fetchAllCompetitions(): Promise<CompetitionInterface[]> {
        let competitions = await CompetitionMongoose.find({})
        if (competitions === null) competitions = []
        return competitions
    }
}

class EvaluationModel {
    // A hypothetically complicated class
    async fetchAllEvaluations(): Promise<EvaluationInterface[]> {
        let evaluations = await EvaluationMongoose.find({})
        if (evaluations === null) evaluations = []
        return evaluations
    }
}

class Facade {
    // A simplified facade offering the services of subsystems
    ApplicationModel(): Promise<ApplicationInterface[]> {
        // Uses the subsystems method
        return new ApplicationModel().fetchAllApplications()
    }

    CompetitionModel(): Promise<CompetitionInterface[]> {
        // Uses the subsystems method
        return new CompetitionModel().fetchAllCompetitions()
    }

    EvaluationModel(): Promise<EvaluationInterface[]> {
        // Uses the subsystems method
        return new EvaluationModel().fetchAllEvaluations()
    }
}