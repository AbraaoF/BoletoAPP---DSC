import { Container } from "inversify";
import { BoletoController } from "../BoletoController";
import { IController } from "../IController";
import { IndexController } from "../IndexController";
import { LoginController } from "../LoginController";
import { UserController } from "../UserController";
import ControllerTypes from "./ControllerTypes";

//criando container com o inversify
const ControllerContainer = new Container()

//instanciando controllers dentro do container ControllerContainer
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(BoletoController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(IndexController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(LoginController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(UserController);

export default ControllerContainer;