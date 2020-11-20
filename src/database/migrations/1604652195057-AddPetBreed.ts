import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPetBreed1604652195057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pets', new TableColumn({
            name: 'breed',
            type: 'varchar',
            isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pets', 'breed');

    }

}
