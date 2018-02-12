import User from '../classes/user'

export default (app, db) => {
  app.post('/user/register', async (req, res) => {
    const error = await User.register(req.body, db)
    return res.json({
      err: error
    })
  })
}
