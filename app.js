require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter, MONGO } = require('./utils/constants');
const mainRoute = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = MONGO } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

mongoose.connect(DB_URL, {});

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(requestLogger);
app.use(limiter);

app.use('/', mainRoute);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
