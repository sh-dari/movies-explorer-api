const mongoose = require('mongoose');
const { REG_EXP_URL, ERROR_MESSAGE_URL } = require('../utils/constants');

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
      message: ERROR_MESSAGE_URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => REG_EXP_URL.test(v),
      message: ERROR_MESSAGE_URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => REG_EXP_URL.test(v),
      message: ERROR_MESSAGE_URL,
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
