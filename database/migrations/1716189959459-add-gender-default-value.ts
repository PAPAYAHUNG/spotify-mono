import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenderDefaultValue1716189959459 implements MigrationInterface {
    name = 'AddGenderDefaultValue1716189959459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL DEFAULT 'male'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL`);
    }

}
