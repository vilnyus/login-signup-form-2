
import { UsersDAO } from "./users";

export class SessionHandler {

    public users; 
    // var sessions = new SessionsDAO(db);
    
    constructor(db) {
        this.users = new UsersDAO(db);
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
        var email = req.body.email
        var username = req.body.username
        var password = req.body.password
        var verify = req.body.verify

        var errors = {'username': username, 'email': email}

        if(this.validateSignup(username, password, verify, email, errors)) {
            console.log("validateing signup");

            this.users.addUser(username, password, email, function(err, user) {
                console.log("add user");
            });
        }
    }

    public validateSignup(username, password, verify, email, errors) {
 
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