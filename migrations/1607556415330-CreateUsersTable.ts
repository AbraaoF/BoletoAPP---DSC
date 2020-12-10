import { table } from "console";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1607556415330 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'usuarios',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'login',
                    type: 'varchar',
                    isUnique: true,
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
    }

}
