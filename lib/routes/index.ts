// import { SessionHandler } from "./session";
// import { ContentHandler } from './content';

export function Routes (app, db) {

    // var sessionHandler = new SessionHandler(db);

    // middleware to check if user is logged in 
    // app.use(sessionHandler.isLoggedInMiddleware);

    // index login page
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

    // // Logout
    // app.get('/logout', sessionHandler.displayLogoutPage);

    // // Signup
    // app.get('/signup', sessionHandler.displaySignupPage);
    // app.post('/signup', sessionHandler.handleSignup);



}


