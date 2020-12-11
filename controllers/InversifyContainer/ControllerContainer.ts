import { Container } from "inversify";
import { AutenticaController } from "../AutenticaController";
import { BoletoController } from "../BoletoController";
import { IController } from "../IController";
import { IndexController } from "../IndexController";
import { UserController } from "../UserController";
import ControllerTypes from "./ControllerTypes";

//criando container com o inversify
const ControllerContainer = new Container()

//instanciando controllers dentro do container ControllerContainer
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(BoletoController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(IndexController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(UserController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(AutenticaController);

export default ControllerContainer;