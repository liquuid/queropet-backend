import {MigrationInterface, QueryRunner} from "typeorm";

export default class UserFavoriteAndCandidatePet1600730084257 implements MigrationInterface {
    name = 'UserFavoriteAndCandidatePet1600730084257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "PetUser"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "PetPhoto"`);
        await queryRunner.query(`CREATE TABLE "users_favorite_pets_pets" ("usersId" uuid NOT NULL, "petsId" uuid NOT NULL, CONSTRAINT "PK_481434931cbb335f18c61398a86" PRIMARY KEY ("usersId", "petsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88d99b7192e1a74abc293bc2f0" ON "users_favorite_pets_pets" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82f5c850b2b2cd070e9e76dafd" ON "users_favorite_pets_pets" ("petsId") `);
        await queryRunner.query(`CREATE TABLE "users_candidate_pets_pets" ("usersId" uuid NOT NULL, "petsId" uuid NOT NULL, CONSTRAINT "PK_c5d889472bbeee100bf1cb8ad07" PRIMARY KEY ("usersId", "petsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a4986a501598ba77569ac06000" ON "users_candidate_pets_pets" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_12f8c83601f230d1680afc36ab" ON "users_candidate_pets_pets" ("petsId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_211e21cb87084397a90321ca01e" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorite_pets_pets" ADD CONSTRAINT "FK_88d99b7192e1a74abc293bc2f09" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorite_pets_pets" ADD CONSTRAINT "FK_82f5c850b2b2cd070e9e76dafd9" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_candidate_pets_pets" ADD CONSTRAINT "FK_a4986a501598ba77569ac060004" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_candidate_pets_pets" ADD CONSTRAINT "FK_12f8c83601f230d1680afc36ab8" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_candidate_pets_pets" DROP CONSTRAINT "FK_12f8c83601f230d1680afc36ab8"`);
        await queryRunner.query(`ALTER TABLE "users_candidate_pets_pets" DROP CONSTRAINT "FK_a4986a501598ba77569ac060004"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_pets_pets" DROP CONSTRAINT "FK_82f5c850b2b2cd070e9e76dafd9"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_pets_pets" DROP CONSTRAINT "FK_88d99b7192e1a74abc293bc2f09"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_211e21cb87084397a90321ca01e"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4ddf2615c9d24b5be6d26830b4b"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`DROP INDEX "IDX_12f8c83601f230d1680afc36ab"`);
        await queryRunner.query(`DROP INDEX "IDX_a4986a501598ba77569ac06000"`);
        await queryRunner.query(`DROP TABLE "users_candidate_pets_pets"`);
        await queryRunner.query(`DROP INDEX "IDX_82f5c850b2b2cd070e9e76dafd"`);
        await queryRunner.query(`DROP INDEX "IDX_88d99b7192e1a74abc293bc2f0"`);
        await queryRunner.query(`DROP TABLE "users_favorite_pets_pets"`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "PetPhoto" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "PetUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
