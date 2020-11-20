import {MigrationInterface, QueryRunner,TableColumn} from "typeorm";

export class RemoveSurnameFromUsers1600726321098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'surname');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn(        {
            name: 'surname',
            type: 'varchar',
            isNullable: true,
        },));

    }

}
