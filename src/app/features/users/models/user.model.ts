export interface User {
    id: string;
    email: string;
    username: string;
    postedSongs: string[];
    ownSongs: string[];
}

export interface UserRegisterDto {
    username: string;
    email: string;
    password?: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}