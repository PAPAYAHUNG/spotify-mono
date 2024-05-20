import { Role } from 'src/role/role.enum';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    gender: string;
    roles: Role[];
    secretToken: string;
    is2faEnabled: boolean;
}
