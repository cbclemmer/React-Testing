import { Express, Request, Response, NextFunction } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

import Procedures from '../procedures'
import User from '../classes/user'
import { authenticate, login } from '../auth'

export default function(app: Express, procedures: Procedures) {
  app.get('/api/users/:id', async (req: Request, res: Response) => {
    const user = new User(procedures)
    try {
      return res.json((await user.load(new ObjectId(req.params.id))).safeData)
    } catch (error) {
      return res.json({ error })
    }
  })

  app.get('/api/user/auth', async (req: Request, res: Response) => {
    const user = new User(procedures)
    try {
      return res.json(req.isAuthenticated()
        ? (await user.load(req.user.id)).safeData
        : { error: 'Not logged in' }
      )
    } catch (error) {
      return res.json({ error })
    }
  })

  app.post('/api/user/register', async (req: Request, res: Response) => {
    try {
      const user = await User.create(procedures, req.body)
      await login(req, user)
      return res.json(user.safeData)
    } catch (error) {
      return res.json({ error })
    }
  })

  app.post('/api/user/login', async (req: Request, res: Response, next: NextFunction) =>
    res.json((await authenticate(req, res, next)).safeData))

  app.post('/api/user/logout', async (req: Request, res: Response) => {
    req.logout()
    res.json({ error: false })
  })

  app.post('/api/user/follow', async (req: Request, res: Response) => {
    try {
      const user = await new User(procedures).load(req.user.id)
      await user.follow(new ObjectId(req.body.destination))
      return res.json({ error: false })
    } catch (error) {
      return res.json({ error })
    }
  })
}
