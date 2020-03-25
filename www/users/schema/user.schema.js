"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
exports.UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['USER'],
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    passwordAgain: {
        type: String,
        required: false,
    },
}, {
    strict: false,
});
exports.UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    else {
        bcryptjs.hash(user.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            user.passwordAgain = '';
            next();
        });
    }
});
exports.UserSchema.methods.checkPassword = function (attempt, callback) {
    const user = this;
    bcryptjs.compare(attempt, user.password, (err, isMatch) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, isMatch);
    });
};
//# sourceMappingURL=user.schema.js.map