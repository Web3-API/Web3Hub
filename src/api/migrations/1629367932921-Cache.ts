import {MigrationInterface, QueryRunner} from "typeorm";

export class Cache1629367932921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."uri_cache" ("id" BIGSERIAL NOT NULL, "uri" character varying NOT NULL, "ipfs" character varying NOT NULL, "last_updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "uri_cache_pkey" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."uri_cache"`);
    }

}
