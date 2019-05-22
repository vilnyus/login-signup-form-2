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
}
exports.UsersDAO = UsersDAO;
//# sourceMappingURL=users.js.map