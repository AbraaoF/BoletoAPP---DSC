import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity } from 'typeorm';
import bcypt from 'bcryptjs';

//sinalizando que a classe Usuario representa uma tabela no banco
@Entity('usuarios')
class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id?: string;
    
    @Column()
    login: string;
    
    @Column()
    senha: string;

    //função hash bcryptjs para gerar hash da senha antes de salvar no banco de dados;
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.senha = bcypt.hashSync(this.senha, 8);     /*Encriptando a senha com um salt de 8 */
    }
}



export default Usuario;