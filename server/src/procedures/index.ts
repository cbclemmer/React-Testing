import * as $ from 'jquery'
import { map } from 'lodash'
import { Db, ObjectId, Collection, AggregationCursor } from 'mongodb'

export interface IUserSchema {
  _id?: ObjectId,
  userName: string,
  email: string,
  password: string
}

export interface ITweetSchema {
  _id?: ObjectId,
  userID: ObjectId,
  contents: string,
  dateCreated: Date,
  user?: IUserSchema
}

export default class Procedures {
  private users: Collection
  private tweets: AggregationCursor
  private db: Db

  constructor(db: Db) {
    this.db = db
    this.users = db.collection('User')
    this.tweets = db.collection('Tweet')
      .aggregate([{$lookup: {
        from: 'User',
        localField: 'userID',
        foreignField: '_id',
        as: 'user'
      }}])
  }

  public async user_get_dbId(id: ObjectId): Promise<IUserSchema> {
    const user: IUserSchema = await this.users.findOne({ _id: id })
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

  public async tweets_get_byUserID(userID: ObjectId, limit: number = 20): Promise<ITweetSchema[]> {
    const user = await this.user_get_dbId(userID)
    if (!user) {
      throw 'Cannot find user'
    }

    const docs = await this.tweets
    .match({ userID })
    .limit(limit)
    .sort({ dateCreated: -1 })
    .toArray()

    return map(docs, (d: any) => {
      if (d.user.length > 0) {
        d.user = d.user[0]
      }
      return d
    })
  }

  public async tweet_get_byId(id: ObjectId): Promise<ITweetSchema> {
    const tweet: ITweetSchema = await this.tweets.match({ _id: id }).next()
    if (!tweet) {
      throw `Tweet not found: ${id}`
    }
    return tweet
  }

  public async tweet_post_create(userID: ObjectId, contents: string): Promise<ITweetSchema> {
    if (!await this.user_get_dbId(userID)) {
      throw 'Cannot find user'
    }

    const tweet: ITweetSchema = {
      userID,
      contents,
      dateCreated: new Date()
    }
    return (await this.db.collection('Tweet').insertOne(tweet)).ops[0]
  }
}
