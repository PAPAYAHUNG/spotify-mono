"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGenderColumn1716178215137 = void 0;
class AddGenderColumn1716178215137 {
    constructor() {
        this.name = 'AddGenderColumn1716178215137';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
    }
}
exports.AddGenderColumn1716178215137 = AddGenderColumn1716178215137;
//# sourceMappingURL=1716178215137-add-gender-column.js.map