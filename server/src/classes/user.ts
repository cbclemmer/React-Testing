import { extend, pick, noop } from 'lodash'
import { Db, ObjectId } from 'mongodb'

import Procedures, { IUserSchema } from '../procedures'

interface IRegisterModel {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

export interface IUserSafeData {
  id: string,
  userName: string,
  email: string
}

async function validateRegistration(procedures: Procedures, m: IRegisterModel) {
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

  // If we find either one, error out
  try {
    await procedures.user_get_byEmail(m.email)
    return 'Email is already taken'
  } catch (e) {
    noop()
  }

  try {
    await procedures.user_get_byUserName(m.userName)
    return 'Username already taken'
  } catch (e) {
    noop()
  }

  return null
}

export default class User {
  public static async create(procedures: Procedures, data: IRegisterModel): Promise<User> {
    const error = await validateRegistration(procedures, data)
    const u = new User(procedures)
    if (error) {
      u.error = error
      return u
    }
    const user = await procedures.user_post_create({
      userName: data.userName,
      email: data.email,
      password: data.password
    })

    await u.load(user._id.toString())
    return u
  }

  public id: string
  public userName: string
  public email: string
  public error: string
  public loaded: boolean = false
  private procedures: Procedures

  constructor(procedures: Procedures) {
    this.procedures = procedures
  }

  public async find(email: string, password: string) {
    try {
      this.fromDbObject(await this.procedures.user_get_auth(email, password))
    } catch (error) {
      this.error = error
    }
  }

  public async load(id: string) {
    try {
      this.fromDbObject(await this.procedures.user_get_dbId(id))
    } catch (error) {
      this.error = error
    }
  }

  public get safeData(): IUserSafeData {
    return pick(this, ['id', 'userName', 'email'])
  }

  private fromDbObject(user: IUserSchema): void {
    this.id = user._id.toString()
    extend(this, pick(user, ['userName', 'email']))
    this.loaded = true
  }
}
