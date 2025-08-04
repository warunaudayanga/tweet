// noinspection SqlNoDataSourceInspection,JSUnusedGlobalSymbols

import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754341287261 implements MigrationInterface {
    name = 'Init1754341287261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tweet-replies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "content" character varying NOT NULL, "author_id" uuid, "tweet_id" uuid, CONSTRAINT "PK_3561b8bf4bc2a6cef8aae342259" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweet-likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "tweet_id" uuid, "user_id" uuid, CONSTRAINT "PK_36f9d5af753d3ec477041dfe27e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tweets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "content" character varying NOT NULL, "author_id" uuid, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "email_verified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweet-replies" ADD CONSTRAINT "FK_f897fa496abf8370ab45d24dd59" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweet-replies" ADD CONSTRAINT "FK_1c480068f19b0cdd9d0f1a3962b" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweet-likes" ADD CONSTRAINT "FK_68f1bcc1833cff3c8d5dbcf485b" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweet-likes" ADD CONSTRAINT "FK_89ae3cca7555190c2f2c6d76509" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_6783f8d04acbff7ce2b2ee823f7" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_6783f8d04acbff7ce2b2ee823f7"`);
        await queryRunner.query(`ALTER TABLE "tweet-likes" DROP CONSTRAINT "FK_89ae3cca7555190c2f2c6d76509"`);
        await queryRunner.query(`ALTER TABLE "tweet-likes" DROP CONSTRAINT "FK_68f1bcc1833cff3c8d5dbcf485b"`);
        await queryRunner.query(`ALTER TABLE "tweet-replies" DROP CONSTRAINT "FK_1c480068f19b0cdd9d0f1a3962b"`);
        await queryRunner.query(`ALTER TABLE "tweet-replies" DROP CONSTRAINT "FK_f897fa496abf8370ab45d24dd59"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
        await queryRunner.query(`DROP TABLE "tweet-likes"`);
        await queryRunner.query(`DROP TABLE "tweet-replies"`);
    }

}
