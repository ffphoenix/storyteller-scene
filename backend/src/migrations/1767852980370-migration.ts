import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767852980370 implements MigrationInterface {
    name = 'Migration1767852980370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_scene_layers" ("id" uuid NOT NULL, "name" character varying NOT NULL, "isLocked" boolean NOT NULL DEFAULT false, "isVisible" boolean NOT NULL DEFAULT true, "order" integer NOT NULL, "sceneId" uuid NOT NULL, CONSTRAINT "PK_0f340e5e3953396d83986238e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."game_scenes_gridtype_enum" AS ENUM('square')`);
        await queryRunner.query(`CREATE TYPE "public"."game_scenes_gridmetricsystem_enum" AS ENUM('Feet', 'Meters', 'Miles', 'Squares')`);
        await queryRunner.query(`CREATE TABLE "game_scenes" ("id" uuid NOT NULL, "gameId" integer NOT NULL, "name" character varying NOT NULL, "stageJSON" jsonb NOT NULL, "stageWidth" integer NOT NULL, "stageHeight" integer NOT NULL, "backgroundColor" character varying NOT NULL, "gridType" "public"."game_scenes_gridtype_enum" NOT NULL DEFAULT 'square', "gridCellSize" integer NOT NULL DEFAULT '70', "gridMetricSystem" "public"."game_scenes_gridmetricsystem_enum" NOT NULL DEFAULT 'Squares', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75c4e777219d71751a3f7068696" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game_scene_layers" ADD CONSTRAINT "FK_c7a0cc2a6be01e1e40e071d4c75" FOREIGN KEY ("sceneId") REFERENCES "game_scenes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_scenes" ADD CONSTRAINT "FK_39e909bff4fecd9fb7d5033d42c" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_scenes" DROP CONSTRAINT "FK_39e909bff4fecd9fb7d5033d42c"`);
        await queryRunner.query(`ALTER TABLE "game_scene_layers" DROP CONSTRAINT "FK_c7a0cc2a6be01e1e40e071d4c75"`);
        await queryRunner.query(`DROP TABLE "game_scenes"`);
        await queryRunner.query(`DROP TYPE "public"."game_scenes_gridmetricsystem_enum"`);
        await queryRunner.query(`DROP TYPE "public"."game_scenes_gridtype_enum"`);
        await queryRunner.query(`DROP TABLE "game_scene_layers"`);
    }

}
