import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddGenderColumn1716178215137 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
