const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const {
  ERROR_MESSAGE_EMAIL,
  ERROR_MESSAGE_USER_REPEAT,
  MESSAGE_EXIT,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleResponse = (res, data) => res.status(200).send(data);

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      if (!validator.isEmail(email)) {
        throw new ValidationError(ERROR_MESSAGE_EMAIL);
      }
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => res.status(201).send({
          name, about, avatar, email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(ERROR_MESSAGE_USER_REPEAT));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.exit = (req, res) => {
  res.clearCookie('jwt');
  handleResponse(res, { message: MESSAGE_EXIT });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((data) => handleResponse(res, data))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGE_USER_REPEAT));
      } else {
        next(err);
      }
    });
};
