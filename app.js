require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var courseCategoriesRouter = require('./routes/courseCategories');
var coursesRouter = require('./routes/courses');
var userCoursesRouter = require('./routes/userCourses');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/course-categories', courseCategoriesRouter);
app.use('/courses', coursesRouter);
app.use('/user-courses', userCoursesRouter);

module.exports = app;
