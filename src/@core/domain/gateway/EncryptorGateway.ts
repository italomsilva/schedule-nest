export interface EncryptorGateway {
    encrypt(password: string): Promise<string>
    compare(clean: string, hash: string): Promise<boolean>
}