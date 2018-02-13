import User from '../classes/user'
import Session from '../classes/session';

export default (app: any, db: any) => {
  app.post('/user/register', async (req: any, res: any) => {
    const user = new User()
    await user.load(db, null, req.body)
    const session = new Session()
    if (!user.error) {
      await session.load(db, null, user.id)
    }
    return res.json({
      err: user.error,
      user,
      session
    })
  })

  app.post('/user/login', async (req: any, res: any) => {
    const user = new User()
    await user.load(db, null, null, req.body)
    const session = new Session()
    if (!user.error) {
      await session.load(db, null, user.id)
    }
    return res.json({
      error: user.error,
      user,
      session
    })
  })
}
