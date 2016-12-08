var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//前台路由
var front_index = require('./routes/front_index.js');
//后台路由
var admin_index = require('./routes/admin_index.js');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//定义mysql数据连接字符串

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
//解析cookie
app.use(cookieParser());
//设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', front_index);
app.use('/', admin_index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error.ejs');
});

//监听端口
var server = app.listen(8888, function() {
	console.log('%s listening at %s', server.address().address, server.address().port);
});

module.exports = app;