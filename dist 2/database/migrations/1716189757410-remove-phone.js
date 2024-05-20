"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovePhone1716189757410 = void 0;
class RemovePhone1716189757410 {
    constructor() {
        this.name = 'RemovePhone1716189757410';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(255) NOT NULL`);
    }
}
exports.RemovePhone1716189757410 = RemovePhone1716189757410;
//# sourceMappingURL=1716189757410-remove-phone.js.map