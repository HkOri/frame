var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// 接口版本
const apiVersion = '/api/v0';

var app = express();

// 导入数据库连接程序，注意代码导入位置
require('./model/connect');

// view engine setup
// 这里是配置路由对应跳转显示文件？
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 这里是访问程序的url，在users.js中写的接口，要用的话，前面都得加上/users
// 比如说idnex.js中写的接口/getUserData前面就得加上这里的/，如果这里写的是
// /index，那就得在/getUserData之前加上/index
app.use('/', require('./routes/index'));
app.use(`${apiVersion}/users`, require('./routes/users'));
// app.use(`${apiVersion}/rooms`, require('./routes/rooms'));
app.use(`${apiVersion}/upload`, require('./routes/upload'));
app.use(`${apiVersion}/roomtype`, require('./routes/roomType'));
app.use(`${apiVersion}/foods`, require('./routes/foods'));
// app.use(`${apiVersion}/hotels`, require('./routes/hotels'));
app.use(`${apiVersion}/customers`, require('./routes/customers'));
app.use(`${apiVersion}/foodrecord`, require('./routes/foodRecord'));
app.use(`${apiVersion}/roomorder`, require('./routes/roomOrder'));
app.use(`${apiVersion}/operrecord`, require('./routes/operRecord'));

app.use(`${apiVersion}/paymoney`, require('./routes/paymoney'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
