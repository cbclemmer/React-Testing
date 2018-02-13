import User from '../classes/user'
import Session from '../classes/session';

export default (app: any, db: any) => {
  app.post('/user/register', async (req: any, res: any) => {
    const user = new User()
    await user.load(db, null, req.body)
    const session = new Session()
    return res.json({
      err: user.error,
      user
    })
  })
}
