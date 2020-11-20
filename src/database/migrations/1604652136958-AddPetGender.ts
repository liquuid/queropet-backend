import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPetGender1604652136958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pets', new TableColumn({
            name: 'gender',
            type: 'varchar',
            isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pets', 'gender');

    }

}
