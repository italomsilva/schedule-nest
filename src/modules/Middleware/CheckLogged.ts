import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckLoggedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-parse-session-token'];

    if (!token) {
      throw new UnauthorizedException('unauthorized');
    }

    try {
      const decodedToken: any = jwt.verify(
        token as string,
        process.env.TOKEN_JWT_SECRET_KEY,
      );
      req.body.decodedToken = {
        userId: decodedToken.userId,
        email: decodedToken.email,
      };

      next();
    } catch (error) {
      return res.status(400).send({ error: 'invalid session' });
    }
  }
}
