import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderColumn1716178215137 implements MigrationInterface {
  name = 'AddGenderColumn1716178215137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`gender\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
  }
}
