import User from '../classes/user'
import * as passport from 'passport'
import { pick } from 'lodash'
import { Express, Request, Response, NextFunction } from 'express-serve-static-core'
import { Db } from 'mongodb'
import { authenticate, login } from '../auth'

export default (app: Express, db: Db) => {
  app.get('/user/auth', async (req: Request, res: Response, next: NextFunction) =>
    res.json(await authenticate(req, res, next)))

  app.post('/user/register', async (req: Request, res: Response) => {
    const user = new User()
    await user.load(db, null, req.body)
    if (user.error) {
      return res.json({
        error: user.error,
        user
      })
    }
    const error = await login(req, user)
    res.json({ error, user })
  })

  app.post('/user/login', async (req: Request, res: Response, next: NextFunction) =>
    res.json(await authenticate(req, res, next)))

  app.post('/user/signout', async (req: Request, res: Response) => {
    req.logout()
    res.json({ err: false })
  })
}
