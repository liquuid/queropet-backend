import {MigrationInterface, QueryRunner, Table} from "typeorm";


export default class CreateUsers1600015745494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary:  true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['adopter', 'institution']
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'surname',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'enum',
                        enum: ['mobile', 'home', 'work'],
                        isNullable: true,
                    },
                    {
                        name: 'birthday',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'number',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'neightborhood',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: true,
                    },

                    {
                        name: 'zipcode',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'social_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'info',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
