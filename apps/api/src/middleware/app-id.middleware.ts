import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AppIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const appId = req.headers['app-id']

    if (!appId) {
      res.status(400).json({ message: 'App ID (app-id) header is required' })
      return
    }

    next()
  }
}
