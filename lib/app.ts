
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';
import * as cons from 'consolidate';
import { SessionHandler } from './routes/session';


const app = express();
const PORT = 3000;
// const routesPrv = new Routes(app, db);
// let mongoDb = 'mongodb://127.0.0.1:27017/info_database'; //local DB
let mongoDb = 'mongodb://dolor:135246abc@ds062178.mlab.com:62178/users_db_list'; // cloud DB
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error'));

// let sessionHandler = new SessionHandler(db);
SessionHandler.staticInit(db);

// config server
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}` );
});

// config ejs view engine
app.engine('html', cons.swig);
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
// app.set('views', 'views');
app.set('views', 'views');

// config body-parser
app.use(bodyParser.urlencoded({'extended':true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.get('/', function(req, res, next) {
    console.log("display index page");
    res.render("index");
})

app.get('/welcome', function(req, res, next) {
    console.log("display index welcome page.");
    res.render("welcome");
})

// Request Loggin page
app.get('/login', SessionHandler.displayLoginPage);

// Handle Login 
// app.post('/login', SessionHandler.handleLoginRequest);
app.post('/login', function (req, res, next) {
    SessionHandler.handleLoginRequest(req, res, next);
});

// Signup form
app.get('/signup', SessionHandler.displaySignupPage);

app.post('/signup', SessionHandler.handleSignup);
// app.post('/signup', function (req, res, next) {
//     SessionHandler.handleSignup(req, res, next);
// });




