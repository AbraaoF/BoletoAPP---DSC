import { BoletoController } from "./controllers/BoletoController";
import { IndexController } from "./controllers/IndexController";
import { LoginController } from "./controllers/LoginController";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/login', loginRouter);

//instanciando o controller BoletoController, passando o Application express e registrando as rotas;
new IndexController().forApp(app).routes();
new BoletoController().forApp(app).routes();
new LoginController().forApp(app).routes();

module.exports = app;
