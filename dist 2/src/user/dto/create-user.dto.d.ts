import { Role } from 'src/role/role.enum';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    roles: Role[];
}
