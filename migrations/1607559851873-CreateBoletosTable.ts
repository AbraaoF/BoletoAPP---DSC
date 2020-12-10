import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBoletosTable1607559851873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //criando extansão da função uuid*
        await queryRunner.query('create extension if not exists "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name: 'boletos',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',      /*Extensão uuid para gerar id */
                },
                {
                    name: 'nome',
                    type: 'varchar',
                },
                {
                    name: 'valor',
                    type: 'varchar',
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'dataValidade',
                    type: 'varchar',
                },
                {
                    name: 'id_usuario',
                    type: 'uuid',
                },
            ],
        }));

        //criando chave estrengeira para id e usuario
        await queryRunner.createForeignKey("boletos", new TableForeignKey({
            columnNames: ["id_usuario"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('boletos');
        await queryRunner.query('drop extension "uuid-osspp"');

    }

}
