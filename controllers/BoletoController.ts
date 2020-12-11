import { AbstractController } from "./AbstractController";
import Boleto from '../models/Boleto';

const auth = require("../middlewares/authMiddleware");

export class BoletoController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/boletos';

    //métodos para listar boletos
    listar(){
        
        return async (req: any, res: any, next: any) => {
            //autenticação e autorização
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }

            return res.json(await Boleto.find({ where: { idUsuario: req.params.idUsuario } }));
          };
    }
    //método para criação de boletos
    adicionar(){
        return async function(req : any, res : any, next : any) {
            //autenticação e autorização
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }

            let conta: Boleto = new Boleto();
            conta.nome = req.body.nome;
            conta.valor = req.body.valor;
            conta.status = req.body.status;
            conta.dataValidade = req.body.dataValidade;
            conta.idUsuario = req.params.idUsuario;
            await conta.save();
            await res.send(conta);
        };
    }
    //método para consultar boleto
    consultar(){
        return async function(req : any, res : any, next : any) {
            //autenticação e autorização
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            //buscando conta de acordo com o usuário logado
            let conta: Boleto | undefined = await Boleto.findOne({idUsuario: req.params.idUsuario, nome: req.params.nome});
            //verificando se existe conta
            if (!conta) {
                res.send(404);
            }
            res.send(conta);
        }
    }
    //método para alterar boleto
    alterar(){
        return async function(req : any, res : any, next : any) {
            //autenticação e autorização
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }

            let conta: Boleto = await Boleto.findOne({idUsuario: req.params.idUsuario, nome: req.params.nome}) as Boleto;
            
            if (!conta) {
                res.send(404);
            }

            conta.nome = req.body.nome;
            conta.valor = req.body.valor;
            conta.status = req.body.status;
            conta.dataValidade = req.body.dataValidade;
            conta.idUsuario = req.params.idUsuario;
            await conta.save();

            res.send(conta);
        }
    }
    //método para remover boleto
    remover(){
        return async function(req : any, res : any, next : any) {
            //autenticação e autorização
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }

            let conta: Boleto | undefined = await Boleto.findOne({idUsuario: req.params.idUsuario, nome: req.params.nome}) as Boleto;
            
            if (!conta) {
                res.send(404);
            }
            await conta.remove();

            res.send(conta);
        }
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/:idUsuario').get(this.listar());
        this.forRouter('/:idUsuario').post(this.adicionar());
        this.forRouter('/:idUsuario/:nome').get(this.consultar());
        this.forRouter('/:idUsuario/:nome').delete(this.remover());
        this.forRouter('/:idUsuario/:nome').put(this.alterar());
    }

}