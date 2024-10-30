export interface JwtGateway {
    sign(payload: Payload): Promise<string>
    verify(token: string): Promise<Payload>
}

export type Payload = {
    userId: string,
    email:string
}