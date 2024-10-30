export interface GoogleAuthGateway {
    login(email: string, password: string): Promise<string>;
}
