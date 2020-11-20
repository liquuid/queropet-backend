import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPhoneType1600724680711 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'phone_type',
            type: 'enum',
            enum: ['mobile', 'home', 'work'],
            isNullable: true,
            })
        );
        await queryRunner.dropColumn('users', 'phone');
        await queryRunner.addColumn('users', new TableColumn({
            name: 'phone',
            type: 'varchar',
            isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'phone_type');
        await queryRunner.dropColumn('users', 'phone');
        await queryRunner.addColumn('users', new TableColumn({
            name: 'phone',
            type: 'enum',
            enum: ['mobile', 'home', 'work'],
            isNullable: true,
        }));
    }

}
