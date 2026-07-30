export interface User {
    id: number;
    username: string;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}