require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const mainRoute = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

mongoose.connect(DB_URL, {});

const corsOptions = {
  // origin: 'http://localhost:4000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(requestLogger);

app.use('/', mainRoute);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
