import { Application, Request, Response, NextFunction } from "express"
import { EvaluationInterface, EvaluationMongoose } from "../db/models/Evaluation";
import { UserMongoose } from "../db/models/User";
import { ApplicationInterface, ApplicationMongoose } from "../db/models/Application";
const { v4: uuidv4 } = require('uuid');
import { auth } from "../middleware/auth";
const methodOverride = require('method-override');
import { keyRenameObject } from "../helpers/keyRename";
import { formLabel } from "../db/formLables";

class Condition {
    signedIn: boolean
    completeApplication: boolean
    completeProof: boolean
    constructor(signedIn: boolean, completeApplication: boolean, completeProof: boolean) {
        this.signedIn = signedIn
        this.completeApplication = completeApplication
        this.completeProof = completeProof
    }
    get fullTable(): Array<boolean> {
        return [this.signedIn, this.completeApplication, this.completeProof]
    }
    isSignedIn(req: Request) {
        this.signedIn = req.session.user !== null
        return this.signedIn
    }
    isCompleteApplication(application: ApplicationInterface | null) {
        if (application) this.completeApplication = application.applicationStatus !== "Started"
        return this.completeApplication
    }
    isCompleteProof(application: ApplicationInterface | null) {
        if (application) this.completeProof = application.proof !== null
        return this.completeProof
    }

}

module.exports = function (app: Application) {

    let nav = [
        { name: "Profile", url: "/home-organizer" },
        { name: "View Applications", url: "/all-applications-organizer" },
        { name: "Logout", url: "/logout" }
    ]


    app.get('/home-organizer', auth, function (req: Request, res: Response, next: NextFunction) {
        let user = { ...req.session.user }
        delete user._id
        delete user.__v
        delete user.passWord

        res.render('organizer/home', {
            user: keyRenameObject(user, 'user'),
            nav,
            signInStatus: req.session.user.signInStatus
        });
    });

    app.get('/all-applications-organizer', auth, async (req: Request, res: Response, next: NextFunction) => {
        let application = await ApplicationMongoose.find({ applicationStatus: { $ne: 'rejected' } }).lean()
        let judge = await UserMongoose.find({ signInStatus: 'judge' }).lean()
        let staffName = []
        for (let i = 0; i < application.length; i++) {
            delete application[i].__v
            delete application[i].createdAt
            delete application[i].updatedAt
            delete application[i].evaluationPoints
            staffName.push(application[i].staffName)
            application[i] = keyRenameObject(application[i], 'application')
        }
        res.render('organizer/all-applications', {
            nav,
            application,
            signInStatus: req.session.user.signInStatus,
            formLabel,
            judge: encodeURIComponent(JSON.stringify(judge)),
            staffName: encodeURIComponent(JSON.stringify(staffName))
        });
    });


    app.post('/edit-application/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
        let application: ApplicationInterface | null = new ApplicationMongoose()
        async function reject(id: string) {
            let application = await ApplicationMongoose.findByIdAndUpdate(id, { applicationStatus: 'rejected' })
            return application
        }
        async function accept(id: string) {
            let application = await ApplicationMongoose.findByIdAndUpdate(id, { applicationStatus: 'accepted' })
            return application
        }
        if (req.body.status === "reject") application = await reject(req.params.id)
        else if (req.body.status === "accept") application = await accept(req.params.id)
        else if (req.body.status === "auto") {
            application = await ApplicationMongoose.findById(req.params.id)
            let condition = new Condition(false, false, false)
            condition.isSignedIn(req)
            condition.isCompleteApplication(application)
            condition.isCompleteProof(application)
            switch (condition.fullTable.join(' ')) {
                case 'true true true':
                    accept(req.params.id)
                    break
                case 'true true false':
                case 'true false true':
                case 'false true true':
                case 'true false false':
                case 'false false true':
                case 'false true false':
                case 'false false false':
                    reject(req.params.id)
                    break
                default:
                    reject(req.params.id)
                    break
            }

        }

        res.redirect('/all-applications-organizer')
    });

    app.post('/assign-judge/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
        console.log({ status: req.body.status })
        let evaluation: EvaluationInterface | null = new EvaluationMongoose()
        evaluation = await EvaluationMongoose.findOneAndUpdate({ applicationID: req.params.id }, { judgeID: req.body.judgeName }, { new: true })
        res.redirect('/all-applications-organizer')
    });
}