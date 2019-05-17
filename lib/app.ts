// import * as express from 'express';
import express = require('express');
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';
import { Routes } from './routes';
import * as cons from 'consolidate';

/*
////////////////////
const app = express();
const PORT = 3000;
// const routesPrv = new Routes(app, db);
var mongoDb = 'mongodb://127.0.0.1:27017/info_database';
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error'));

// config server
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}` );
});

// config ejs view engine
app.engine('html', cons.swig);
// this.app.set('view engine', 'ejs');
app.set('view engine', 'html');
// this.app.set('views', 'views');
app.set('views', 'views');

// config body-parser
app.use(bodyParser.urlencoded({'extended':true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.get('/', function(req, res, next) {
    console.log("display index page");
    res.render("index");
})

// Request Loggin page
app.get('/login', function(req, res, next) {
    console.log("display login page");
    res.render("login1" , { username: "" });
});

// Handle Login 
app.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // console.log(req);

    console.log("user submitted username: " + username + " pass: " + password);
    next();
})
// Signup form
app.get('/signup', function(req, res, next) {
    res.render("signup", {
        username:"", password:"",
        password_error:"", email:"", 
        username_error:"", email_error:"",
        verify_error :""});
});

app.post('/signup', function(req, res, next) {

});

*/

class App {
    public app: express.Application;
    public routesPrv; 
    public db;
    // public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        // this.routesPrv.routes(this.app, this.db); 
        this.routesPrv = new Routes(this.app, this.db); 
        this.config();

        // this.setupDb();
    }  
    // private setupDb() {
    //     var mongoDb = 'mongodb://127.0.0.1:27017/info_database';
    //     mongoose.connect(mongoDb);
    //     this.db = mongoose.connection;
    //     this.db.on('error', console.error.bind(console, 'MongoDB Connection error'));
    // }  

    private config(): void{
        
        // config ejs view engine
        this.app.engine('html', cons.swig);
        // this.app.set('view engine', 'ejs');
        this.app.set('view engine', 'html');
        // this.app.set('views', 'views');
        this.app.set('views', 'views');
        

        // config static files
        this.app.use(express.static('public'));
        
        // config body parser
        // this.app.use(express.bodyParser());

        this.app.use(bodyParser.urlencoded({'extended':true})); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); // parse application/json

    }
}


export default new App().app;