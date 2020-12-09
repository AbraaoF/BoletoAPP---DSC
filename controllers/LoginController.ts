import { injectable } from "inversify";
import { AbstractController } from "./AbstractController";

export class LoginController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/login';

    //métodos para criação das rotas
    acesso(){
        return function(req : any, res : any, next : any) {
            res.send('Acesso aos usuários');
        };
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/').get(this.acesso());
    }

}