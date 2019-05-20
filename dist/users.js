"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
class UsersDAO {
    constructor(db) {
        this.users = db.collection("users");
    }
    addUser(username, password, email, callback) {
        // Generate password hash
        var salt = bcrypt.genSaltSync();
        var password_hash = bcrypt.hashSync(password, salt);
        // Create user document
        var user = { '_id': username, 'password': password_hash };
        if (email != "") {
            user['email'] = email;
        }
        this.users.insert(user, function (err, inserted) {
            if (!err) {
                return callback(err, null);
            }
            return callback(err, null);
        });
    }
}
exports.UsersDAO = UsersDAO;
//# sourceMappingURL=users.js.map