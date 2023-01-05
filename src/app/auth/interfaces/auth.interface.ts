export interface AuthResponse {
    ok: boolean;
    userId?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}