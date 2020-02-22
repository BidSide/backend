import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { UserInterface } from '../interfaces/user.interface';

export const UserSchema = new mongoose.Schema({
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

UserSchema.pre<UserInterface>('save', function(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified('password')) {
    return next();
  } else {
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

UserSchema.methods.checkPassword = function(attempt, callback) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // TODO: refactor
  bcryptjs.compare(attempt, user.password, (err, isMatch) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, isMatch);
  });
};
