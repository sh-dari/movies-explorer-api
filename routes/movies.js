const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidate, deleteMovieValidate } = require('../middlewares/validate');

router.get('/', getMovies);
router.post('/', createMovieValidate, createMovie);
router.delete('/:movieId', deleteMovieValidate, deleteMovie);

module.exports = router;
