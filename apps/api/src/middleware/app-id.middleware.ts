import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class AppIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const appId = req.headers['app-id'] || req.query['app-id']

    if (!appId) {
      res.status(400).json({ message: 'App ID (app-id) header or query is required' })
      return
    }

    next()
  }
}
