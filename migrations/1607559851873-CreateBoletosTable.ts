import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBoletosTable1607559851873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'boletos',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'increment',
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
                    type: 'varchar',
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

    }

}
