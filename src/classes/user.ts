import Collection from '../collections'
import { extend } from 'lodash'

interface IRegisterModel {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

interface ILoginModel {
  email: string
  password: string
}

function validateRegistration(m: IRegisterModel) {
  if (!m.userName || !m.email || !m.password || !m.confirmPassword) {
    return 'Invalid request parameters'
  }
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
  public id: string
  public userName: string
  public email: string
  public password: string
  public error: string

  public async load(db: any, id: string, regData: IRegisterModel = null, loginData: ILoginModel = null) {
    if (id === null) {
      if (regData !== null) {
        await this.createUser(db, regData)
      }
      if (loginData !== null) {
        await this.authenticateUser(db, loginData)
      }
    } else {
      await this.loadUser(id, db)
    }
  }

  private async authenticateUser(db: any, data: ILoginModel) {
    const users = db.collection(Collection.User)
    const dbUser = await users.findOne({ email: data.email, password: data.password })
    if (!dbUser) {
      this.error = 'Email or password is incorrect'
      return
    }
    this.id = dbUser._id
    extend(this, dbUser)
  }

  private async loadUser(id: string, db: any) {
    const users = db.collection(Collection.User)
    const dbUser = await users.findOne({ _id: id })
    console.log(dbUser)
  }

  private async createUser(db: any, data: IRegisterModel) {
    const error = validateRegistration(data)
    if (error) {
      this.error = error
      return
    }
    const users = db.collection(Collection.User)
    const dbUser = (await users.insertOne({
      userName: data.userName,
      email: data.email,
      password: data.password
    })).ops[0]

    this.id = dbUser._id
    extend(this, dbUser)
  }
}
