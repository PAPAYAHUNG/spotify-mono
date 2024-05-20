import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/role/role.enum';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    roles?: Role[];
}
export {};
