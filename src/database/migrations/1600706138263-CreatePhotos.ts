import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePhotos1600706138263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'photos',
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
                      name: 'pet_id',
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
      await queryRunner.createForeignKey('photos', new TableForeignKey({
        name: 'PetPhoto',
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pets',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',

      }))

      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('photos', 'PetPhoto');
        await queryRunner.dropTable('photos');

      }

  }
