const router = require('express').Router();
const {
  getMe,
  updateProfile,
} = require('../controllers/users');
const {
  updateUserValidate,
} = require('../middlewares/validate');

router.get('/me', getMe);
router.patch('/me', updateUserValidate, updateProfile);

module.exports = router;
