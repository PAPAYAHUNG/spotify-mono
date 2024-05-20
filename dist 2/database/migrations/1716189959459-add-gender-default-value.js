"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGenderDefaultValue1716189959459 = void 0;
class AddGenderDefaultValue1716189959459 {
    constructor() {
        this.name = 'AddGenderDefaultValue1716189959459';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL DEFAULT 'male'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL`);
    }
}
exports.AddGenderDefaultValue1716189959459 = AddGenderDefaultValue1716189959459;
//# sourceMappingURL=1716189959459-add-gender-default-value.js.map