
import { UsersDAO } from "../users";
import { SessionDAO } from "../sessions";

export class SessionHandler {

    public users; 
    public sessions;
    
    constructor(db) {
        this.users = new UsersDAO(db);
        this.sessions = new SessionDAO(db);
        // console.log("check class name " + this.sessions.getClass().getName());
    }
    
    // Request Login page
    public displayLoginPage(req, res, next) {
        res.render("login", {username:"", password:"", login_error:""});
    }

    // Handle Login
    public handleLoginRequest(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);
        next();

        this.users.validateLogin(username, password, function(err, user) {
            
        });
    }

    // Request Signup page
    public displaySignupPage(req, res, next) {
        res.render("signup", 
            {username:"", password:"",
            password_error:"",
            email:"", username_error:"", email_error:"",
            verify_error :""});
    }

    // Handle Signup page
    public handleSignup(req, res, next) {
        let email: string = req.body.email
        let username: string = req.body.username
        let password: string = req.body.password
        let verify: string = req.body.verify

        let errors = {'username': username, 'email': email}

        // checking validation of input values
        if(this.validateSignup(username, password, verify, email, errors)) {
            console.log("validateing signup");

            // if validated add user data to db
            this.users.addUser(username, password, email, function(err, user) {
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
                this.sessions.startSession(user, function(err, session_id) {
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
        else { console.log("not validated."); }

    }

    public validateSignup(username, password, verify, email, errors) {
 
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