const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const handleResponse = (res, data) => res.status(200).send(data);

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((data) => handleResponse(res, data))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      const owner = data.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(data)
          .then(() => {
            res.send(data);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Невозможно удалить чужой фильм');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const movieData = req.body;
  const owner = req.user._id;
  Movie.create({ ...movieData, owner })
    .then((data) => res.status(201).send(data))
    .catch(next);
};
