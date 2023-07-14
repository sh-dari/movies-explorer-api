const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  REG_EXP_EMAIL,
  ERROR_MESSAGE_UNAUTHORIZED,
  ERROR_MESSAGE_EMAIL,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Аноним',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => REG_EXP_EMAIL.test(v),
      message: ERROR_MESSAGE_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(ERROR_MESSAGE_UNAUTHORIZED));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(ERROR_MESSAGE_UNAUTHORIZED));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
