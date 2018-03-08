import { map } from 'lodash'
import { ObjectId } from 'mongodb'
import { Express, Request, Response, NextFunction } from 'express-serve-static-core'

import Tweet from '../classes/tweet'
import Procedures from '../procedures'

export default function(app: Express, procedures: Procedures) {
  app.get('/api/tweets/:userID', async (req: Request, res: Response) => {
    try {
      return res.json(map(await Tweet.getAllForUser(procedures, new ObjectId(req.params.userID)), (t) => t.safeData))
    } catch (error) {
      return res.json({ error })
    }
  })

  app.post('/api/tweets/create', async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.json({ error: 'Not logged in' })
    }
    try {
      return res.json((await Tweet.create(procedures, req.user.id, req.body.contents)).safeData)
    } catch (error) {
      return res.json({ error })
    }
  })
}
