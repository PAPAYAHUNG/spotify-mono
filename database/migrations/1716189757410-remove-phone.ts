import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhone1716189757410 implements MigrationInterface {
    name = 'RemovePhone1716189757410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(255) NOT NULL`);
    }

}
