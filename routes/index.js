const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const movieRoute = require('./movies');
const userRoute = require('./users');
const loginRoute = require('./login');

const undefinedRoute = (req, res, next) => {
  next(new NotFoundError('Указан неправильный путь'));
};

router.use('/', loginRoute);

router.use(auth);
router.use('/users', userRoute);
router.use('/movies', movieRoute);

router.use(undefinedRoute);

module.exports = router;
