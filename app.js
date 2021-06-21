var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const dotenv = require('dotenv').config();

var indexRouter = require('./routes/index');
const actionRouter = require('./routes/actionRouter')
const adventureRouter = require('./routes/adventureRouter')
const listRouter = require('./routes/listRouter')
const formRouter = require('./routes/form')

var app = express();

const mongodb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.pcxvd.mongodb.net/anime-recomendation-list?retryWrites=true&w=majority`;
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console.error, "Mongoose connection error: "))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/actionAnime', actionRouter)
app.use('/adventureAnime', adventureRouter)

app.use('/completeList', listRouter)
app.use('/form', formRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
