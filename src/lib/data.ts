export interface AuthData {
    isAdmin: boolean;
    email: string;
    password: string;
}

export enum AuthStatus {
    UNAUTHORIZED = 401, // HTTP status code Unauthorized
    AUTHORIZED = 200, // HTTP status code OK
}

export interface AuthMessage {
    title: string;
    description: string;
    status: AuthStatus;
}

