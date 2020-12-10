import { AbstractController } from "./AbstractController";
import Boleto from '../models/Boleto';

export class BoletoController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/boletos';

    //métodos para criação das rotas
    listar(){
        return async function(req : any, res : any, next : any) {
            res.send(await Boleto.find());
        };
    }
    adicionar(){
        return async function(req : any, res : any, next : any) {
            let conta: Boleto = new Boleto();
            conta.nome = req.body.nome;
            conta.valor = req.body.valor;
            conta.status = req.body.status;
            conta.dataValidade = req.body.dataValidade;
            conta.idUsuario = req.body.idUsuario;
            await conta.save();
            await res.send(conta);
        };
    }
    consultar(){
        return async function(req : any, res : any, next : any) {
            let conta: Boleto | undefined = await Boleto.findOne({nome: req.params.nome});
            if (!conta) {
                res.send(404);
            }
            res.send(conta);
        }
    }
    alterar(){
        return async function(req : any, res : any, next : any) {
            let conta: Boleto = await Boleto.findOne({nome: req.params.login}) as Boleto;
            
            if (!conta) {
                res.send(404);
            }

            conta.nome = req.body.nome;
            conta.valor = req.body.valor;
            conta.status = req.body.status;
            conta.dataValidade = req.body.dataValidade;
            conta.idUsuario = req.body.idUsuario;
            await conta.save();

            res.send(conta);
        }
    }
    remover(){
        return async function(req : any, res : any, next : any) {
            let conta: Boleto = await Boleto.findOne({nome: req.params.login}) as Boleto;
            
            if (!conta) {
                res.send(404);
            }
            await conta.remove();

            res.send(conta);
        }
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/').get(this.listar());
        this.forRouter('/').post(this.adicionar());
        this.forRouter('/:nome').get(this.consultar());
        this.forRouter('/:id').put(this.alterar());
        this.forRouter('/:id').delete(this.remover());
    }

}