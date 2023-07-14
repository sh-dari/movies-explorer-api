const rateLimit = require('express-rate-limit');

module.exports.REG_EXP_EMAIL = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}/;
module.exports.REG_EXP_URL = /https*:\/\/[\w\S]{1,}\.[\w\S]{1,}/;

module.exports.ERROR_CODE_CONFLICT = 409;
module.exports.ERROR_CODE_FORBIDDEN = 403;
module.exports.ERROR_CODE_NOT_FOUND = 404;
module.exports.ERROR_CODE_UNAUTHORIZED = 401;
module.exports.ERROR_CODE_VALIDATION = 400;
module.exports.ERROR_CODE_SERVER = 500;

module.exports.ERROR_MESSAGE_SERVER = 'Ошибка на сервере';
module.exports.ERROR_MESSAGE_UNAUTHORIZED = 'Неправильные почта или пароль';
module.exports.ERROR_MESSAGE_URL = 'Неверная ссылка';
module.exports.ERROR_MESSAGE_EMAIL = 'Некорректная почта';
module.exports.ERROR_MESSAGE_NOT_FOUND = 'Указан неправильный путь';

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
