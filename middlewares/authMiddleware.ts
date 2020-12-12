import Usuario from "../models/Usuario";

require("dotenv").config();

const jwt = require("jsonwebtoken");

const { promisify } = require("util");

interface TokenPayLoad {
  id: string,
  iat: number,
  exp: number
}

module.exports = async (req: any, res: any) => {
    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { error: true, msg: "Você não tem permissão para vizualizar esta página, Faça seu login novamente" };
  }

  const [, token] = authHeader.split(" ");

  try {
    const data = await promisify(jwt.verify)(token, 'secret');

    const { id } = data as TokenPayLoad;
    req.userId = id;
    //verificando o usuário logado com o usuário informado
    if(req.params.idUsuario != req.userId) {
      return { error: true, msg: "Você não tem permissão para vizualizar esta página" };
    }
    //verificando se o usuário informado existe
    if(!Usuario.getId( req.params.idUsuario)){
      return { error: true, msg: "Usuário não encontrado" };
    }

    return { error: false };
  } catch (error) {
    return { error: true, msg: "Você não tem autorização para vizualizar esta página" };
  }
};