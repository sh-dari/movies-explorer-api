const router = require('express').Router();
const { createUser, login, exit } = require('../controllers/users');
const { createUserValidate, loginUserValidate } = require('../middlewares/validate');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginUserValidate, login);
router.post('/signout', exit);

module.exports = router;
