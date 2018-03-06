import { Db, ObjectId, Collection } from 'mongodb'

export interface IUserSchema {
  _id?: ObjectId,
  userName: string,
  email: string,
  password: string
}

export default class Procedures {
  private users: Collection

  constructor(db: Db) {
    this.users = db.collection('User')
  }

  public async user_get_dbId(id: string): Promise<IUserSchema> {
    const user: IUserSchema = await this.users.findOne({ _id: new ObjectId(id) })
    if (!user) {
      throw `User not found: ${id}`
    }
    return user
  }

  public async user_get_byEmail(email: string): Promise<IUserSchema> {
    const user: IUserSchema = await this.users.findOne({ email })
    if (!user) {
      throw `No user with email: ${email}`
    }
    return user
  }

  public async user_get_byUserName(userName: string): Promise<IUserSchema> {
    const user: IUserSchema = await this.users.findOne({ userName })
    if (!user) {
      throw `No user with userName: ${userName}`
    }
    return user
  }

  public async user_get_auth(email: string, password: string): Promise<IUserSchema> {
    const user: IUserSchema = await this.users.findOne({ email, password })
    if (!user) {
      throw `Incorrect email or password`
    }
    return user
  }

  public async user_post_create(user: IUserSchema) {
    return (await this.users.insertOne(user)).ops[0]
  }
}
