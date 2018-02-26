import * as passport from 'passport'

import { Express, Request, Response, NextFunction } from 'express-serve-static-core'
import { pick } from 'lodash'
import { Db } from 'mongodb'

import User from '../classes/user'
import { authenticate, login } from '../auth'

export default (app: Express, db: Db) => {
  app.get('/api/user/:id', async (req: Request, res: Response) => {
    const user = new User(db)
    await user.load(req.params.id)
    return res.json({
      error: user.error,
      user: user.safeData
    })
  })

  app.get('/api/user/auth', async (req: Request, res: Response) => {
    const authed = req.isAuthenticated()
    const user = new User(db)
    if (authed) {
      const id = req.user._id.toString()
      await user.load(id)
    }
    return res.json({
      error: authed
        ? user.error ? user.error : null
        : 'Not logged in',
      user: user.safeData
    })
  })

  app.post('/api/user/register', async (req: Request, res: Response) => {
    const user = await User.create(db, req.body)
    if (user.error) {
      return res.json({
        error: user.error,
        user
      })
    }
    const error = await login(req, user)
    res.json({ error, user: user.safeData })
  })

  app.post('/api/user/login', async (req: Request, res: Response, next: NextFunction) =>
    res.json(await authenticate(req, res, next)))

  app.post('/api/user/logout', async (req: Request, res: Response) => {
    req.logout()
    res.json({ error: false })
  })
}
