var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    salt: String,
    hashPass: String,
    avatar: String,
    roles: [String],
    lastLog: Date
});

userSchema.method({
    authenticate: function (password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {
    seedInitialUsers: function () {
        User.find({}).exec(function (err, allUsers) {
            if (err) {
                console.log('Cannot find users: ' + err);
                return;
            }

            if (allUsers.length === 0) {
                var salt,
                    hashedPwd;

                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'jewelryadmin');
                User.create({
                    username: 'administrator',
                    salt: salt,
                    hashPass: hashedPwd,
                    avatar: 'http://img2.wikia.nocookie.net/__cb20120204201430/plazmabursttwo/images/0/0e/Admin_logo_by_lucifercho-d39lpuk.png',
                    roles: ['admin']
                });
            }
        });
    }
};