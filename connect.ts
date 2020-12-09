import {createConnection} from "typeorm";

//criando conexão com o banco de dados
createConnection().then(() => console.log('📮 Sucesso na Conexão com o banco de dados'));