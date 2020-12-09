//import para usar o @injectable()
import { connect } from "http2";
import "reflect-metadata";
import { IController } from "./controllers/IController";
import ControllerContainer from "./controllers/InversifyContainer/ControllerContainer";
import ControllerTypes from "./controllers/InversifyContainer/ControllerTypes";

//importando a conexão com o banco de dados
import "./connect";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//inversão de dependencia com injeção de controle;

//atribuindo ao controllers o container com as instancias dos controles;
const controllers: IController[]= ControllerContainer.getAll<IController>(ControllerTypes.Controller);

//chamada do metodo de criação das rotas de cada controller;
controllers.forEach(controller => {
    controller.forApp(app).routes();
});

module.exports = app;
