import { Ability, InferSubjects } from '@casl/ability';
import { Action } from 'constanst/constants';
import { Song } from 'src/songs/songs.entity';
import { User } from 'src/user/entities/user.entity';
type Subjects = InferSubjects<typeof Song | typeof User> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
export declare class CaslAbilityFactory {
    createForUser(user: User): Ability<[Action, Subjects], import("@casl/ability").MongoQuery>;
}
export {};
