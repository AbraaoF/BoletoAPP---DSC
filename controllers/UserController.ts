import { AbstractController } from "./AbstractController";
import Usuario from '../models/Usuario';

const auth = require("../middlewares/authMiddleware");

export class UserController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/user';

    //método para criação de usuários
     criar(){
        return async function(req : any, res : any, next : any) {
            let usuario: Usuario = new Usuario();
            usuario.login = req.body.login;
            usuario.senha = req.body.senha;
            await usuario.save();
            await res.send(usuario);
        };
    }

    //método para listar os usuários
    listar(){
        return async function(req : any, res : any, next : any) {
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            res.send(await Usuario.find());
        }
    }

    //método para buscar usuário pelo login
    consultar(){
        return async function(req : any, res : any, next : any) {
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            let usuario: Usuario | undefined = await Usuario.findOne({login: req.params.login});
            if (!usuario) {
                res.send(404);
            }
            res.send(usuario);
        }
    }

    //método para alterar o usuário
    alterar(){
        return async function(req : any, res : any, next : any) {
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            let usuario: Usuario = await Usuario.findOne({login: req.params.login}) as Usuario;
            
            if (!usuario) {
                res.send(404);
            }

            usuario.login = req.body.login;
            usuario.senha = req.body.senha;
            await usuario.save();

            res.send(usuario);
        }
    }

    //método para remover usuário
    remover(){
        return async function(req : any, res : any, next : any) {
            //autenticação
            let autenticou = await auth(req, res);
            if (autenticou.error) {
              return res.status(403).json({ msg: autenticou.msg });
            }
            
            let usuario: Usuario = await Usuario.findOne({login: req.params.login}) as Usuario;
            
            if (!usuario) {
                res.send(404);
            }
            await usuario.remove();

            res.send(usuario);
        }
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/').post(this.criar());
        this.forRouter('/').get(this.listar());
        this.forRouter('/:login').get(this.consultar());
        this.forRouter('/:login').put(this.alterar());
        this.forRouter('/:login').delete(this.remover());
    }

}