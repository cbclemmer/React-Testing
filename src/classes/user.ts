interface IRegisterModel {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

function validateRegistration(m: IRegisterModel) {
  if (m.userName.length === 0
    || m.email.length === 0
    || m.password.length === 0
  ) {
    return 'Some fields are empty'
  }
  if (m.password !== m.confirmPassword) {
    return 'Password does not match confirmation'
  }
  if (m.password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return null
}

export default class User {
  public static async register(m: IRegisterModel, db) {
    const error = validateRegistration(m)
    if (error) {
      return error
    }
    const users = db.collection('Users')
    await users.insertOne({
      userName: m.userName,
      email: m.email,
      password: m.password
    })
    return null
  }

  public userName: string
  public email: string
  public password: string
}
