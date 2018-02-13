import User from '../classes/user'

export default (app: any, db: any) => {
  app.post('/user/register', async (req: any, res: any) => {
    const user = new User(db, null, req.body)
    return res.json({
      err: user.error,
      user
    })
  })
}
