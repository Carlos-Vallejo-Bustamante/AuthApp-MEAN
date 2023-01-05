export interface AuthResponse {
    ok: boolean;
    id?: string;
    name?: string;
    token?: string;
    msg?: string;
}

export interface User {
    id: string;
    name: string;
}