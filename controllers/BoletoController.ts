import { AbstractController } from "./AbstractController";
import Boleto from '../models/Boleto';

const auth = require("../middlewares/authMiddleware");

export class BoletoController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/boletos';

    //métodos para listar boletos
    listar(){
        
        return async (req: any, res: any, next: any) => {
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            return res.json(await Boleto.find());
          };
    }
    //método para criação de boletos
    adicionar(){
        return async function(req : any, res : any, next : any) {
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
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
    //método para consultar boleto
    consultar(){
        return async function(req : any, res : any, next : any) {
            let conta: Boleto | undefined = await Boleto.findOne({nome: req.params.nome});
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            if (!conta) {
                res.send(404);
            }
            res.send(conta);
        }
    }
    //método para alterar boleto
    alterar(){
        return async function(req : any, res : any, next : any) {
            let conta: Boleto = await Boleto.findOne({nome: req.params.nome}) as Boleto;
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
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
    //método para remover boleto
    remover(){
        return async function(req : any, res : any, next : any) {
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            let conta: Boleto = await Boleto.findOne({nome: req.params.nome}) as Boleto;
            
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
        this.forRouter('/:nome').put(this.alterar());
        this.forRouter('/:nome').delete(this.remover());
    }

}