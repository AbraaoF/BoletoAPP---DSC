import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//sinalizando que a classe Usuario representa uma tabela no banco
@Entity('usuarios')
class Usuario {

    @PrimaryGeneratedColumn('increment')
    id: string;
    
    @Column()
    login: string;
    
    @Column()
    senha: string;
}

export default Usuario;