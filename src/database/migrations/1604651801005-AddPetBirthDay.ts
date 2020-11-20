import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPetBirthDay1604651801005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pets', new TableColumn({
            name: 'birth_day',
            type: 'varchar',
            isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pets', 'birth_day');
    }
}
