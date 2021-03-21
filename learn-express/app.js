var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // 요청에 대한 정보를 콘솔에 기록해주는 미들웨어

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// customized middleware
app.use((req, res, next) => {
  console.log(req.url, ':: Customized Middleware');
  next(); // 반드시 미들웨어 안에서 next()를 호출해야 다음 미들웨어로 넘어간다.
  /**
   * next() : 다음 미들웨어로
   * next('route') : 다음 라우터로
   * next(error) : 에러 핸들러로
   */
});

app.use(logger('dev'));
/** logger의 인자 : dev/short/common/combined
 * dev : GET / 200 51.267 ms - 1539 (HTTP요청(GET) 주소(/) HTTP상태코드(200) 응답속도(51.267ms) - 응답바이트(1539))
 * short :  ::1 - GET / HTTP/1.1 304 - - 1028.771 ms
 * common : ::1 - - [16/Mar/2021:14:27:45 +0000] "GET / HTTP/1.1" 304 -
 * combined : ::1 - - [16/Mar/2021:14:28:25 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/**
 * 에러 핸들링 미들웨어는 일반적으로 미들웨어 중 제일 아래에 위치하여 위에 있는 미들웨어에서 바생하는 에러를 받아서 처리한다.
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
