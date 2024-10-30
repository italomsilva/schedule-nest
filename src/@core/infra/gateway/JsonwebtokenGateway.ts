import { JwtGateway, Payload } from '../../domain/gateway/JwtGateway';
import * as jwt from 'jsonwebtoken';

export class JsonwebtokenGateway implements JwtGateway {
  async sign(payload: Payload): Promise<string> {
    console.log(jwt.sign);

    return jwt.sign(payload, process.env.TOKEN_JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_JWT_EXPIRED,
    });
  }

  async verify(token: string): Promise<Payload> {
    try {
      const payload: any = jwt.verify(token, process.env.TOKEN_JWT_SECRET_KEY);

      return {
        userId: payload.userId,
        email: payload.email,
      };
    } catch (error) {
      throw new Error('invalid Token');
    }
  }
}
