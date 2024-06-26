"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const signIn_dto_1 = require("./signIn.dto");
class UpdateAuthDto extends (0, mapped_types_1.PartialType)(signIn_dto_1.SignInDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map