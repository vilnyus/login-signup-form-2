import * as crypto from 'crypto';

export class SessionDAO {

    public sessions;

    constructor(db) {
        this.sessions = db.collection("sessions");
    }

    public startSession(username, callback) {
        let current_date: string = (new Date()).valueOf().toString();
        let random: string = Math.random().toString();
        let session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');

        let session = { 'username': username, '_id': session_id };

        this.sessions.insertOne(session, function(err, result) {
            callback(err, session_id);
        });
    }

    public endSession(session_id, callback) {
        sessionStorage.deleteOne( { '_id': session_id}, function(err, numRemoved) {
            console.log("number of removed session is " + numRemoved);
            callback(err);
        });
    }

    public getUserName(session_id, callback) {

        if (!session_id) {
            callback(Error("Session not set"), null);
            return;
        }

        this.sessions.findOne({ '_id' : session_id }, function(err, session) {
            "use strict";

            if (err) return callback(err, null);

            if (!session) {
                callback(new Error("Session: " + session + " does not exist"), null);
                return;
            }

            callback(null, session.username);
        });
    }
}