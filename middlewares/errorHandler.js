const { ERROR_CODE_SERVER, ERROR_MESSAGE_SERVER } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_CODE_SERVER
      ? ERROR_MESSAGE_SERVER
      : message,
  });
  next();
};
