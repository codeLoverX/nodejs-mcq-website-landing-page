import * as express from "express"
import { Application } from "express"

import { connectDB } from './db/db'
import { addPlusToHandleBars } from "./middleware/handlebarsConfig";
const loginController = require('./controllers/login')
const judgeController = require('./controllers/judge')
const organizerController = require('./controllers/organizer')
const participantController = require('./controllers/participant')
const dotenv = require('dotenv');
const session = require('express-session');
var exphbs = require('express-handlebars');
const {join} = require("path")
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
    layoutsDir: join(__dirname, 'views/layouts'),
    partialsDir: join(__dirname, 'views/partials'),

}));
app.engine('handlebars', exphbs({
    helpers: {
        math: addPlusToHandleBars,
        
    }
}));

app.use(express.static(join(__dirname, 'public')));

loginController(app);
participantController(app);
organizerController(app);
judgeController(app);

connectDB()

app.listen(process.env.PORT || 5000, function () {
})

module.exports = app;
