import Collection from '../collections'
import { extend, pick } from 'lodash'
import { Db, ObjectId } from 'mongodb'

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
  public static async create(db: Db, data: IRegisterModel): Promise<User> {
    const error = validateRegistration(data)
    const u = new User(db)
    if (error) {
      u.error = error
      return u
    }
    const users = db.collection(Collection.User)
    const { _id } = (await users.insertOne({
      userName: data.userName,
      email: data.email,
      password: data.password
    })).ops[0]

    await u.load(_id.toString())
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

  public async load(id: string) {
    const users = this.db.collection(Collection.User)
    const user = await users.findOne({ _id: new ObjectId(id) })
    if (!user) {
      this.error = 'User not found: ' + id
      return
    }
    this.id = user._id
    extend(this, pick(user, ['email', 'userName']))
    this.loaded = true
  }

  public get safeData(): any {
    return pick(this, ['id', 'userName', 'email'])
  }
}
