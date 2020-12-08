import { Application, IRoute } from "express";

export class BoletoController{
    
    //usando inversão de dependência para instanciar o application express no controller;
    //declarando propriedade app para receber o application express do middleware
    private app?:Application;
    private prefix: string = '/boletos';
    
    //método forApp para receber o application express passado como parâmetro;
    forApp(app: Application){
        this.app = app;
        return this;
    }

    //encapsulamento da chamada para as rotas
    forRouter(path: string) : IRoute{
        return this.app?.route(`${this.prefix}${path}`) as IRoute;
    }

    //criando os métodos para criação das rotas do CRUD
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