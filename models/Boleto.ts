import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//sinalizando que a classe Usuario representa uma tabela no banco
@Entity('boletos')
class Boleto {

    @PrimaryGeneratedColumn('increment')
    id: string;
    
    @Column()
    nome: string;
    
    @Column()
    valor: string;
    
    @Column()
    status: string;
    
    @Column()
    dataValidade: string;
    
    @Column()
    idUsuario: string;
}

export default Boleto;