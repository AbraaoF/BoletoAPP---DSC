import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1607556415330 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        //criando extansão da função uuid*
        await queryRunner.query('create extension if not exists "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name: 'usuarios',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',      /*Extensão uuid para gerar id */
                },
                {
                    name: 'login',
                    type: 'varchar',
                },
                {
                    name: 'senha',
                    type: 'varchar',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios');
        await queryRunner.query('drop extension "uuid-osspp"');
    }

}
