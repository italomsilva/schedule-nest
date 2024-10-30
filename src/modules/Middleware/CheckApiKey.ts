// check-api-key.middleware.ts

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckAPIKeyMiddleware  implements NestMiddleware {
  private readonly expectedAPIKey = process.env.API_KEY;

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-parse-rest-api-key'];

    if (!apiKey || apiKey !== this.expectedAPIKey) {
      throw new UnauthorizedException('unauthorized');
    }

    next();
  }
}
