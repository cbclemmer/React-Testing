import { extend, pick } from 'lodash'
import { Db, ObjectId } from 'mongodb'

import Collection from '../collections'

interface IRegisterModel {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

interface IUserDbSchema {
  _id: ObjectId,
  userName: string,
  email: string,
  password: string
}

async function validateRegistration(db: Db, m: IRegisterModel) {
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
  const users = db.collection(Collection.User)
  const emailUser = await users.findOne({ email: m.email })
  if (emailUser) {
    return 'Email is already taken'
  }
  const userNameUser = await users.findOne({ userName: m.userName })
  if (userNameUser) {
    return 'Username is already taken'
  }
  return null
}

export default class User {
  public static async create(db: Db, data: IRegisterModel): Promise<User> {
    const error = await validateRegistration(db, data)
    const u = new User(db)
    if (error) {
      u.error = error
      return u
    }
    const users = db.collection(Collection.User)
    const user = (await users.insertOne({
      userName: data.userName,
      email: data.email,
      password: data.password
    })).ops[0]

    await u.load(user._id.toString())
    return u
  }

  public id: string
  public userName: string
  public email: string
  public error: string
  public loaded: boolean = false
  private db: Db

  constructor(db: Db) {
    this.db = db
  }

  public async find(email: string, password: string) {
    const users = this.db.collection(Collection.User)
    const user = await users.findOne({ email, password })
    if (!user) {
      this.error = 'Incorrect email or password'
      return
    }
    this.fromDbObject(user)
  }

  public async load(id: string) {
    const users = this.db.collection(Collection.User)
    const user = await users.findOne({ _id: new ObjectId(id) })
    if (!user) {
      this.error = 'User not found: ' + id
      return
    }
    this.fromDbObject(user)
  }

  public get safeData(): any {
    return pick(this, ['id', 'userName', 'email'])
  }

  private fromDbObject(user: any) {
    this.id = user._id.toString()
    extend(this, pick(user, ['userName', 'email']))
    this.loaded = true
  }
}
