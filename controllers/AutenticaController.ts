import { AbstractController } from "./AbstractController";
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario';

export class AutenticaController extends AbstractController{
    
    //variável prefix para receber o path da rota;
    protected prefix: string = '/auth';

    //método para autenticação de usuários
     autentica(){
        return async function(req : any, res : any, next : any) {
            const repository = getRepository(Usuario);
            const { login, senha } = req.body;
            
            const user = await repository.findOne({ where: { login } });
            
            if(!user){
                return res.sendStatus(401);
            }

            const validPass = await bcrypt.compare(senha, user.senha);

            if(!validPass){
                return res.sendStatus(401);
            }

            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

            return res.json({
                user,
                token
            });
        };
    }

    //instanciando a criação das rotas;
    routes(){
        this.forRouter('/').post(this.autentica());
    }

}