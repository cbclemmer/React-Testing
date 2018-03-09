import { extend, noop } from 'lodash'
import { Db, ObjectId, ObjectID } from 'mongodb'

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

async function validateRegistration(procedures: Procedures, m: IRegisterModel): Promise<void> {
  if (!m.userName || !m.email || !m.password || !m.confirmPassword) {
    throw 'Invalid request parameters'
  }
  if (m.userName.length === 0
    || m.email.length === 0
    || m.password.length === 0
  ) {
    throw 'Some fields are empty'
  }
  if (m.password !== m.confirmPassword) {
    throw 'Password does not match confirmation'
  }
  if (m.password.length < 8) {
    throw 'Password must be at least 8 characters'
  }

  // If we find either one, error out
  try {
    await procedures.user_get_byEmail(m.email)
    throw 'Email is already taken'
  } catch (e) {
    noop()
  }

  try {
    await procedures.user_get_byUserName(m.userName)
    throw 'Username already taken'
  } catch (e) {
    noop()
  }
}

export default class User {
  public static async create(procedures: Procedures, data: IRegisterModel): Promise<User> {
    try {
      await validateRegistration(procedures, data)
    } catch (error) {
      throw error
    }
    const user = new User(procedures)
    return user.fromDbObject(await procedures.user_post_create({
      userName: data.userName,
      email: data.email,
      password: data.password
    }))
  }

  public id: ObjectId
  public userName: string
  public email: string
  public loaded: boolean = false
  private procedures: Procedures

  constructor(procedures: Procedures) {
    this.procedures = procedures
  }

  public async find(email: string, password: string): Promise<User> {
    this.fromDbObject(await this.procedures.user_get_auth(email, password))
    return this
  }

  public async load(id: ObjectId): Promise<User> {
    this.fromDbObject(await this.procedures.user_get_dbId(id))
    return this
  }

  public async follow(destination: ObjectId): Promise<void> {
    await this.procedures.follow_post_follow(this.id, destination)
  }

  public get safeData(): IUserSafeData {
    return {
      id: this.id.toString(),
      userName: this.userName,
      email: this.email
    }
  }

  public fromDbObject(user: IUserSchema): User {
    this.id = user._id
    this.userName = user.userName
    this.email = user.email
    this.loaded = true
    return this
  }
}
