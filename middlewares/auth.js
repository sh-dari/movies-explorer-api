const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { ERROR_MESSAGE_UNAUTHORIZED } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGE_UNAUTHORIZED));
  }
  req.user = payload;
  next();
};
