require("dotenv").config();

const jwt = require("jsonwebtoken");

const { promisify } = require("util");

module.exports = async (req: any, res: any) => {
    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { error: true, msg: "Você não tem permissão para vizualizar esta página, Faça seu login novamente" };
  }

  const [, token] = authHeader.split(" ");

  try {
    await promisify(jwt.verify)(token, 'secret');
    return { error: false };
  } catch (error) {
    return { error: true, msg: "Você não tem permissão para vizualizar esta página" };
  }
};