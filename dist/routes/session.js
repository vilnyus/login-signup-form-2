"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const sessions_1 = require("../sessions");
class SessionHandler {
    static staticInit(db) {
        SessionHandler.users = new users_1.UsersDAO(db);
        SessionHandler.sessions = new sessions_1.SessionsDAO(db);
    }
    // Request Login page
    static displayLoginPage(req, res, next) {
        res.render("login", { username: "", password: "", login_error: "" });
    }
    // Handle Login
    static handleLoginRequest(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        console.log("user submitted username: " + username + " pass: " + password);
        next();
        SessionHandler.users.validateLogin(username, password, function (err, user) {
            SessionHandler.sessions.startSession(user['_id'], function (err, session_id) {
                console.log("starting new session.", user['_id']);
                if (err) {
                    console.log("We have error.");
                    return next(err);
                }
                else {
                    console.log("We have no error.");
                }
                res.cookie('session', session_id);
                return res.redirect('/welcome');
            });
        });
        SessionHandler.users.validateLogin(username, password, function (err, user) {
            console.log("Validating login user.");
            if (err) {
                if (err.no_such_user_error) {
                    res.render("login", { username: username, password: "", login_username_error: "No such user" });
                }
                else if (err.invalid_password_error) {
                    res.render("login", { username: username, password: password, login_password_error: "Invalid password" });
                }
                else {
                    return next(err);
                }
            }
            SessionHandler.sessions.startSession(user['_id'], function (err, session_id) {
                console.log("starting new session.", user['_id']);
                if (err) {
                    console.log("We have error.");
                    return next(err);
                }
                else {
                    console.log("We have no error.");
                }
                res.cookie('session', session_id);
                return res.redirect('/welcome');
            });
        });
    }
    // Request Signup page
    static displaySignupPage(req, res, next) {
        res.render("signup", { username: "", password: "",
            password_error: "",
            email: "", username_error: "", email_error: "",
            verify_error: "" });
    }
    // Handle Signup page
    static handleSignup(req, res, next) {
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let verify = req.body.verify;
        let errors = { 'username': username, 'email': email };
        // checking validation of input values
        if (SessionHandler.validateSignup(username, password, verify, email, errors)) {
            console.log("validateing signup");
            // if validated add user data to db
            SessionHandler.users.addUser(username, password, email, function (err, user) {
                console.log("add user " + user);
                if (err) {
                    console.log("Error.");
                    // this was a duplicate
                    if (err.code == '11000') {
                        errors['username_error'] = "Username already in use. Please choose another";
                        return res.render("signup", errors);
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }
                // Starting new session
                // here we have error TypeError: Cannot read property 'sessions' of undefined
                // console.log(instanceOf this.sessions);               
                SessionHandler.sessions.startSession(user, function (err, session_id) {
                    console.log("start Session.");
                    if (err) {
                        console.log("Error: startSession.");
                        return next(err);
                    }
                    res.cookie('session', session_id);
                    console.log("redirect to welcome.");
                    return res.redirect('/welcome');
                });
            });
        }
        else {
            console.log("not validated.");
        }
    }
    static validateSignup(username, password, verify, email, errors) {
        console.log('validate signup.');
        var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/;
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;
        errors['username_error'] = "";
        errors['password_error'] = "";
        errors['verify_error'] = "";
        errors['email_error'] = "";
        if (!USER_RE.test(username)) {
            errors['username_error'] = "invalid username. try just letters and numbers";
            return false;
        }
        if (!PASS_RE.test(password)) {
            errors['password_error'] = "invalid password.";
            return false;
        }
        if (password != verify) {
            errors['verify_error'] = "password must match";
            return false;
        }
        if (email != "") {
            if (!EMAIL_RE.test(email)) {
                errors['email_error'] = "invalid email address";
                return false;
            }
        }
        console.log('validate signup.');
        return true;
    }
}
exports.SessionHandler = SessionHandler;
//# sourceMappingURL=session.js.map