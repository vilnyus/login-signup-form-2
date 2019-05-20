"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as express from 'express';
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cons = require("consolidate");
const sessions_1 = require("./sessions");
const app = express();
const PORT = 3000;
// const routesPrv = new Routes(app, db);
var mongoDb = 'mongodb://127.0.0.1:27017/info_database';
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error'));
var sessionHandler = new sessions_1.SessionHandler(db);
// config server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// config ejs view engine
app.engine('html', cons.swig);
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
// app.set('views', 'views');
app.set('views', 'views');
// config body-parser
app.use(bodyParser.urlencoded({ 'extended': true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.get('/', function (req, res, next) {
    console.log("display index page");
    res.render("index");
});
// Request Loggin page
app.get('/login', sessionHandler.displayLoginPage);
// Handle Login 
app.post('/login', sessionHandler.handleLoginRequest);
// Signup form
app.get('/signup', sessionHandler.displaySignupPage);
app.post('/signup', sessionHandler.handleSignup);
//# sourceMappingURL=app.js.map