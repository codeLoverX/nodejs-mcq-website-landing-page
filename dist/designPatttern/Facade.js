"use strict";
// The Facade pattern concept
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
const Application_1 = require("../schema/Application");
const Competition_1 = require("../schema/Competition");
const Evaluation_1 = require("../schema/Evaluation");
class ApplicationModel {
    // A hypothetically complicated class
    fetchAllApplications() {
        return __awaiter(this, void 0, void 0, function* () {
            let applications = yield Application_1.ApplicationMongoose.find({});
            if (applications === null)
                applications = [];
            return applications;
        });
    }
}
class CompetitionModel {
    // A hypothetically complicated class
    fetchAllCompetitions() {
        return __awaiter(this, void 0, void 0, function* () {
            let competitions = yield Competition_1.CompetitionMongoose.find({});
            if (competitions === null)
                competitions = [];
            return competitions;
        });
    }
}
class EvaluationModel {
    // A hypothetically complicated class
    fetchAllEvaluations() {
        return __awaiter(this, void 0, void 0, function* () {
            let evaluations = yield Evaluation_1.EvaluationMongoose.find({});
            if (evaluations === null)
                evaluations = [];
            return evaluations;
        });
    }
}
class Facade {
    // A simplified facade offering the services of subsystems
    ApplicationModel() {
        // Uses the subsystems method
        return new ApplicationModel().fetchAllApplications();
    }
    CompetitionModel() {
        // Uses the subsystems method
        return new CompetitionModel().fetchAllCompetitions();
    }
    EvaluationModel() {
        // Uses the subsystems method
        return new EvaluationModel().fetchAllEvaluations();
    }
}
