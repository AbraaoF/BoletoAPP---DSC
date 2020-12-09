
import { injectable } from "inversify";

import { AbstractController } from "./AbstractController";

export class BoletoController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/boletos';

    //métodos para criação das rotas
    listar(){
        return function(req : any, res : any, next : any) {
            res.send('Listagem de Contas a pagar');
        };
    }
    adicionar(){
        return function(req : any, res : any, next : any) {
            res.send('Adicionar Conta a pagar');
        }
    }
    consultar(){
        return function(req : any, res : any, next : any) {
            res.send(`Consultar Conta a pagar #${req.params.id}`);
        }
    }
    alterar(){
        return function(req : any, res : any, next : any) {
            res.send(`Alterar Conta a pagar #${req.params.id}`);
        }
    }
    remover(){
        return function(req : any, res : any, next : any) {
            res.send(`Excluir Conta a pagar #${req.params.id}`);
        }
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/').get(this.listar());
        this.forRouter('/').post(this.adicionar());
        this.forRouter('/:id').get(this.consultar());
        this.forRouter('/:id').put(this.alterar());
        this.forRouter('/:id').delete(this.remover());
    }

}