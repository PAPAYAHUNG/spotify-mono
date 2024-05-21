
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST"
}

export class CreateSongInput {
    title: string;
    authors: string[];
    releasedDate: string;
    duration: string;
    lyrics?: Nullable<string>;
}

export class UpdateSongInput {
    title?: Nullable<string>;
    authors?: Nullable<string[]>;
    releasedDate?: Nullable<string>;
    duration?: Nullable<string>;
    lyrics?: Nullable<string>;
}

export class User {
    id: string;
    username: string;
    email: string;
    gender: string;
    roles: Role[];
}

export class Artist {
    id: string;
    user: User;
    songs: Song[];
}

export class Song {
    id: string;
    title: string;
    authors: string[];
    releasedDate: string;
    duration: string;
    lyrics?: Nullable<string>;
    artist: Artist[];
}

export abstract class IQuery {
    abstract songs(): Song[] | Promise<Song[]>;

    abstract song(id: string): Nullable<Song> | Promise<Nullable<Song>>;

    abstract artists(): Artist[] | Promise<Artist[]>;

    abstract artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createSong(title: string, authors: string[], releasedDate: string, duration: string, lyrics?: Nullable<string>): Song | Promise<Song>;

    abstract createSong2(input?: Nullable<CreateSongInput>): Song | Promise<Song>;

    abstract updateSong(id: string, input?: Nullable<UpdateSongInput>): Song | Promise<Song>;
}

type Nullable<T> = T | null;
