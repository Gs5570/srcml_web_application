const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const errMiddleware = require('./middleware/errorMiddleware');
// const authMiddleware = require('./middleware/authMiddlware');

const connectionTodb = require('./dbConnection');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const srcMlRouter = require('./routes/srcMLConversion');
const downloadSrcMLRouter = require('./routes/downloadSrcml');

//connection to database
connectionTodb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(logger('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(authMiddleware);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/convertsrc', srcMlRouter);
app.use('/downloadsrcmlfile', downloadSrcMLRouter);
app.use('/user', usersRouter);

app.use(errMiddleware.notFound);
app.use(errMiddleware.errorHandler);

module.exports = app;
