import * as express from "express"
import { Application, Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from "dotenv"
const session = require('express-session');
var exphbs = require('express-handlebars');
const path = require("path")
const methodOverride = require('method-override');
dotenv.config({ path: './env/config.env' })
const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'handlebars');
app.set('views', './dist/views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),

}));
app.engine('handlebars', exphbs({
    helpers: {
        math: function (lvalue: string, operator: string, rvalue: string) {
            let lvalue_ = parseFloat(lvalue);
            let rvalue_ = parseFloat(rvalue);
            return {
                "+": lvalue_ + rvalue_,
                "-": lvalue_ - rvalue_,
                "*": lvalue_ * rvalue_,
                "/": lvalue_ / rvalue_,
                "%": lvalue_ % rvalue_
            }[operator];
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'))
import { connectDB } from './db'
import { seeder } from "./seeder";
import { CompetitionMongoose } from "./schema/Competition";
import { EvaluationMongoose } from "./schema/Evaluation";
import { UserMongoose } from "./schema/User";
import { ApplicationInterface, ApplicationMongoose } from "./schema/Application";

connectDB()

let auth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user)
        return next();
    else
        res.render('login', { warning: "Login first" });
}
app.get('/works', (req: Request, res: Response, next: NextFunction) => res.json({ success: true, req: req.header.length }))
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('login');
})
app.get('/reset', async (req: Request, res: Response, next: NextFunction) => {
    res.json(await seeder())
})

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login', { success: "Logged out" });
});

app.post('/', async (req: Request, res: Response, next: NextFunction) => {
    let IsNoWarning: boolean = (req.body.username && req.body.password) || req.body.usertype;
    if (IsNoWarning) {
        let user = new UserMongoose();
        try {
            if (!req.body.usertype) user = await UserMongoose.findOne({ userName: req.body.username, passWord: req.body.password });
            else {
                user = await UserMongoose.findOne({ _id: req.body.usertype });
            }
            console.log({ user })
            if (user === null) {
                throw new Error('Null user. Login or password is incorrect!')
            }
            req.session.user = user;
        }
        catch (err) {
            res.render('login', { warning: err });
        }
        console.log(user.signUpStatus)
        if (user.signInStatus === "participant") res.redirect('/home-participant')
        else if (user.signInStatus === "judge") res.redirect('/home-judge')
        else res.redirect('/home-organizer')
    }
    else {
        res.render('login', { warning: "No login or usertype" });
    }
})

app.get('/home-participant', auth, function (req, res) {
    let user = { ...req.session.user }
    delete user._id
    delete user.__v
    console.log(typeof user)
    console.log({ user })
    res.render('home-participant', {
        user, nav: [
            { name: "Profile", url: "/home-participant" },
            { name: "Application Submission", url: "/application-submission" },
            { name: "Logout", url: "/logout" }
        ]
    });
});

app.get('/application-submission', auth, async (req: Request, res: Response, next: NextFunction) => {
    let user = { ...req.session.user }
    try {

        let application = await ApplicationMongoose.findOne({ staffID: user._id }).lean()
        console.log({ application, id: user._id })
        if (application === null) {
            application = new ApplicationMongoose({
                applicationStatus: "Not submitted",
                // more
                programName: null,
                numberOfLocalVisitors: null,
                funding: null,
                ratings: null,
                numberOfForeignVisitors: null,
            }).toObject()
         
        }
        delete application.__v
        console.log({ application, user })
        res.render('application-submission', {
            application, nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }

            ]
        });
    }

    catch (err) {
        res.render('application-submission', {
            warning: "Problems loading. Try again",
            application: {}, nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }

            ]
        });
    }

})


app.post('/application-submission', auth, async (req: Request, res: Response, next: NextFunction) => {
    let user = { ...req.session.user }
    try {
        let application = new ApplicationMongoose({
            applicationReff: req.body.applicationReff,
            applicationStatus: "Submitted",
            staffID: req.session.user._id,
            submissionDtae: new Date().toString(),
            _id: uuidv4(),
            // more
            programName: req.body.programName,
            numberOfLocalVisitors: req.body.numberOfLocalVisitors,
            funding: req.body.funding,
            ratings: req.body.ratings,
            numberOfForeignVisitors: req.body.numberOfForeignVisitors,
        })
        await application.save()
        let evaluation = new EvaluationMongoose({
            applicationID: application._id,
            _id: uuidv4(),
            evaluationDateTime: new Date(),
            judgeID: "judge",
            markEachElements: [0, 0, 0, 0],
            rank: null,
            result: "",
            TotalMark: 0,
        })
        await evaluation.save()

        let applicationObject = application.toObject()
        delete applicationObject.__v
        res.render('application-submission', {
            application: applicationObject,
            success: "Successful application. Wait for evaluation!",
            nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }

            ]
        });
    }
    catch (err) {
        res.render('application-submission', {
            warning: "Problems loading. Try again",
            application: {}, nav: [
                { name: "Profile", url: "/home-participant" },
                { name: "Application Submission", url: "/application-submission" },
                { name: "Logout", url: "/logout" }

            ]
        });
    }
})


app.get('/home-judge', auth, function (req, res) {
    let user = { ...req.session.user }
    delete user._id
    delete user.__v
    console.log(typeof user)
    console.log({ user })
    res.render('home-participant', {
        user, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "View applications", url: "/all-applications-judge" },
            { name: "Logout", url: "/logout" }

        ]
    });
});


app.get('/all-applications-organizer', auth, async (req: Request, res: Response, next: NextFunction) => {
    let application = await ApplicationMongoose.find({}).lean()
    let evaluation = await EvaluationMongoose.find
    for (let i = 0; i < application.length; i++) {
        delete application[i].__v
        delete application[i].createdAt
        delete application[i].updatedAt
    }
    console.log({ application })
    res.render('all-applications-organizer', {
        application, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications-organizer" },
            { name: "Logout", url: "/logout" }

        ]
    });
});


app.get('/all-applications-judge', auth, async (req: Request, res: Response, next: NextFunction) => {
    let evaluation = await EvaluationMongoose.find({}).populate('applicationID').lean()
    console.log({ evaluation })
    res.render('all-applications-judge', {
        evaluation, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications-judge" },
            { name: "Logout", url: "/logout" }

        ]
    });
});

app.post('/delete-application/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    let application = await ApplicationMongoose.findByIdAndDelete(req.params.id)
    res.redirect('/all-applications-organizer')
});

// deleteApplication
app.post('/post-evaluation/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    let funding =   parseFloat(req.body.funding)
    let ratings=  parseFloat(req.body.ratings)
    let numberOfForeignVisitors= parseFloat( req.body.numberOfForeignVisitors)
    let numberOfLocalVisitors=  parseFloat(req.body.numberOfLocalVisitors)
    let evaluation = await EvaluationMongoose.findByIdAndUpdate(req.params.id, {
        markEachElements: [funding, ratings, numberOfForeignVisitors, numberOfLocalVisitors ],
        TotalMark: funding + ratings + numberOfForeignVisitors + numberOfLocalVisitors
    })
    res.redirect('/all-applications-judge')
});


app.get('/get-applications-judge', auth, async (req: Request, res: Response, next: NextFunction) => {
    let user = { ...req.session.user }
    let usertype = ""
    if (user.signInStatus === "judge") { usertype = "judge"; }
    else if (user.signInStatus === "organizer") { usertype = "organizer"; }
    let application = await ApplicationMongoose.find({})

    res.render('all-applications', {
        usertype,
        application, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications-judge" },
            { name: "Logout", url: "/logout" }

        ]
    });
});


app.get('/get-applications-organizer', auth, async (req: Request, res: Response, next: NextFunction) => {
    let user = { ...req.session.user }
    let usertype = ""
    if (user.signInStatus === "judge") { usertype = "judge"; }
    else if (user.signInStatus === "organizer") { usertype = "organizer"; }
    let application = await ApplicationMongoose.find({})
    console.log(typeof application)
    console.log({ application })
    res.render('all-applications-organizer', {
        usertype,
        application, nav: [
            { name: "Profile", url: "/home-judge" },
            { name: "All Forms", url: "/all-applications-organizer" },
            { name: "Logout", url: "/logout" }

        ]
    });
});

app.get('/home-organizer', auth, function (req, res) {
    let user = { ...req.session.user }
    delete user._id
    delete user.__v
    console.log(typeof user)
    console.log({ user })
    res.render('home-participant', {
        user, nav: [
            { name: "Profile", url: "/home-organizer" },
            { name: "View Applications", url: "/all-applications-organizer" },
            { name: "Logout", url: "/logout" }

        ]
    });
});


// app.use('/api/v1', routesAuth)
// app.get('/api/v1/resetData', function (req: Request, res: Response){
//     resetData()
//     res.json({success: true}
// })

app.listen(process.env.PORT || 5000, function () {
    console.log('Hello my friend') // outputs green text
})

module.exports = app;
