import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPetCoat1604652247987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pets', new TableColumn({
            name: 'coat',
            type: 'varchar',
            isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pets', 'coat');

    }

}
