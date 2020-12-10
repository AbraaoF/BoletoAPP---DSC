import { AbstractController } from "./AbstractController";
import Usuario from '../models/Usuario';
import { getRepository } from "typeorm";

export class UserController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/user';

    //método para criação de usuários
     criar(){
        return async function(req : any, res : any, next : any) {
            const repository = getRepository(Usuario);
            const { login, senha } = req.body;
            const user = repository.create({ login, senha });
            await repository.save(user);

            return res.json(user);
        };
    }
    //método para remover usuário
    remover(){
        return async function(req : any, res : any, next : any) {
            const repository = getRepository(Usuario);
            const { id } = req.params;
            const user = repository.delete({ id });

            return res.json(user);
        }
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/').post(this.criar());
        this.forRouter('/:id').delete(this.remover());
    }

}