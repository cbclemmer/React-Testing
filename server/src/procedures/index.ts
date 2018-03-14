import * as $ from 'jquery'
import { map } from 'lodash'
import { Db, ObjectId, AggregationCursor, Collection } from 'mongodb'

export enum Collections {
  User = 'User',
  Tweet = 'Tweet',
  Follow = 'Follow'
}

export interface IUserSchema {
  _id?: ObjectId,
  userName: string,
  email: string,
  password: string,
  followers?: string[],
  following?: string[]
}

export interface IFollowSchema {
  _id?: ObjectId,
  origin: ObjectId, // Person that followed
  destination: ObjectId // Person that is being followed
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
  private tweets: Collection
  private db: Db

  constructor(db: Db) {
    this.db = db
    this.users = db.collection(Collections.User)
    this.tweets = db.collection(Collections.Tweet)
  }

  public get agg_get_user_follow() {
    return this.users.aggregate([
      {
        from: Collections.Follow,
        localField: '_id',
        foreignField: 'origin',
        as: 'following'
      },
      {
        from: Collections.Follow,
        localField: '_id',
        foreignField: 'destination',
        as: 'followers'
      }
    ])
  }

  public get agg_tweet_user() {
    return this.tweets.aggregate([{$lookup: {
      from: Collections.User,
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

  public async user_post_create(user: IUserSchema): Promise<IUserSchema> {
    return (await this.db.collection(Collections.User).insertOne(user)).ops[0]
  }

  public async follow_post_follow(origin: ObjectId, destination: ObjectId): Promise<void> {
    try {
      const userOrigin = this.user_get_dbId(origin)
    } catch (e) {
      throw 'Cannot find origin: ' + origin
    }
    try {
      const userDestination = this.user_get_dbId(destination)
    } catch (e) {
      throw 'Cannot find destination: ' + destination
    }

    const follow: IFollowSchema = { origin, destination }
    await this.db.collection(Collections.Follow).insertOne(follow)
  }

  public async tweets_get_byUserID(userID: ObjectId, limit: number = 20): Promise<ITweetSchema[]> {
    const user = await this.user_get_dbId(userID)
    if (!user) {
      throw 'Cannot find user'
    }

    const docs = await this.agg_tweet_user
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
    const tweet: ITweetSchema = await this.agg_tweet_user.match({ _id: id }).next()
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
    return (await this.db.collection(Collections.Tweet).insertOne(tweet)).ops[0]
  }
}
