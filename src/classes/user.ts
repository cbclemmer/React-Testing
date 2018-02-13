import Collection from '../collections'
import { extend } from 'lodash'

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
  public id: string
  public userName: string
  public email: string
  public password: string
  public error: string

  public async load(db: any, id: string, data: IRegisterModel = null) {
    if (id === null) {
      if (data !== null) {
        await this.createUser(db, data)
      }
    } else {
      await this.loadUser(id, db)
    }
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
    }).ops[0])

    this.id = dbUser._id
    this.userName = dbUser.userName
    this.email = dbUser.email
    this.password = dbUser.password
  }
}
