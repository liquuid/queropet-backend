import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddSocialIdType1604448900165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'social_id_type',
            type: 'enum',
            enum: ['cpf', 'cnpj'],
            isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'social_id_type');
    }

}
