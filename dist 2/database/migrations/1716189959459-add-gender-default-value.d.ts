import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddGenderDefaultValue1716189959459 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
