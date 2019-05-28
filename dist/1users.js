"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
class UsersDAO {
    constructor(db) {
        this.users = db.collection("users");
    }
    addUser(username, password, email, callback) {
        // Generate password hash
        let salt = bcrypt.genSaltSync();
        let password_hash = bcrypt.hashSync(password, salt);
        // Create user document
        let user = { '_id': username, 'password': password_hash };
        if (email != "") {
            user['email'] = email;
        }
        this.users.insertOne(user, function (err, inserted) {
            if (!err) {
                // if no error returns 
                return callback(err, inserted.ops[0]._id);
            }
            // in case of error returns error
            return callback(err, null);
        });
    }
    validateLogin(username, password, callback) {
        // Callback to pass to MongoDB that validates a user document
        function validateUserDoc(err, user) {
            if (err) {
                console.log("Validate login.");
                return callback(err, null);
            }
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(null, user);
                }
                else {
                    var invalid_password_error = new Error("Invalid password");
                    // Extra field to distinguish this from a db error
                    invalid_password_error.invalid_password = true;
                    callback(invalid_password_error, null);
                }
            }
            else {
                var no_such_user_error = new Error("User: " + user + " does not exist");
                // Extra field to distinguish this from a db error
                no_such_user_error.no_such_user = true;
                callback(no_such_user_error, null);
            }
        }
        this.users.findOne({ '_id': username }, validateUserDoc);
    }
}
exports.UsersDAO = UsersDAO;
//# sourceMappingURL=1users.js.map