import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767665482759 implements MigrationInterface {
    name = 'Migration1767665482759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."games_status_enum" AS ENUM('CREATED', 'STARTED')`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "shortUrl" character varying(8) NOT NULL, "name" character varying NOT NULL, "status" "public"."games_status_enum" NOT NULL DEFAULT 'CREATED', "ownerId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7b6608d704f481bd298cdcc78f1" UNIQUE ("shortUrl"), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7b6608d704f481bd298cdcc78f" ON "games" ("shortUrl") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7b6608d704f481bd298cdcc78f"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TYPE "public"."games_status_enum"`);
    }

}
