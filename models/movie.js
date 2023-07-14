const mongoose = require('mongoose');
const { REG_EXP_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => REG_EXP_URL.test(v),
      message: 'Неверная ссылка на изображение',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => REG_EXP_URL.test(v),
      message: 'Неверная ссылка на видео',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => REG_EXP_URL.test(v),
      message: 'Неверная ссылка на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
