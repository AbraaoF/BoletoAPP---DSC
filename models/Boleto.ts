import { id } from 'inversify';
import { type } from 'os';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

//sinalizando que a classe Usuario representa uma tabela no banco
@Entity('boletos')
class Boleto extends BaseEntity {

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
    
    @ManyToOne(type => Usuario, { cascade: true } )
    @JoinColumn()
    idUsuario: Usuario[];
}

export default Boleto;