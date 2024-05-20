import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemovePhone1716189757410 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
