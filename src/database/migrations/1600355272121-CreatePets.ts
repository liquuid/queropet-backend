import {MigrationInterface, QueryRunner, Table,TableForeignKey} from "typeorm";

export class CreatePets1600355272121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'pets',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary:  true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'                    },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'species',
                    type: 'enum',
                    enum: ['dog','cat','other'],
                    isNullable: false,
                },
                {
                    name: 'particulars',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'info',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true,
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
    await queryRunner.createForeignKey('pets', new TableForeignKey({
      name: 'PetUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',

    }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('pets', 'PetUser');
      await queryRunner.dropTable('pets');

    }

}
