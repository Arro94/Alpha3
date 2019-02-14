
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const router = express.Router();

var options = function () {
    this.assetsDir = __dirname + '/../assets';
    this.emailList = this.assetsDir + '/email_list.txt';
    this.clearListKey = 'test';
};
const fs = require( 'fs' );

router.post('/addEmail', (req, res) => {
    const name = req.body.txtName;
    const email = req.body.txtEmail;
    if(!name || !email) {
        res.sendStatus(400);
        console.info('  Bad request - Request does not contain name or email');
    } else {
        const path = req.body.filePath ?
            options.assetsDir + req.body.filePath : options.emailList;
        if(!fs.existsSync(path)) {
            fs.writeFileSync(path, 'wx');
        }
        const entry = '\n' + name + ' (' + email + ')';
        fs.appendFileSync(path, entry);
        console.info('  Added ' + name + ' (' + email + ') ' + ' to the distribution list');
        res.sendStatus(204);
    }
});
app.use(router);

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
    //res.render('error');

  res.json({
    message: err.message,
       error: err
  });

});

module.exports = app;
