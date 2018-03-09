import { map, extend } from 'lodash'
import { ObjectId } from 'mongodb'

import Procedures, { ITweetSchema } from '../procedures'
import User, { IUserSafeData} from './user'

export interface ITweetSafeData {
  id: string
  userID: string
  contents: string
  dateCreated: Date
  user: IUserSafeData
}

export default class Tweet {
  public static async create(procedures: Procedures, userID: ObjectId, contents: string): Promise<Tweet> {
    if (contents.length === 0) {
      throw 'Tweet cannot be empty'
    }
    if (contents.length > 140) {
      throw 'Cannot make tweet more than 140 characters'
    }
    const tweet = new Tweet(procedures)
    return tweet.fromDbObject(await procedures.tweet_post_create(userID, contents))
  }

  public static async getAllForUser(procedures: Procedures, userID: ObjectId): Promise<Tweet[]> {
    return map(await procedures.tweets_get_byUserID(userID), (t) => new Tweet(procedures).fromDbObject(t))
  }

  public id: ObjectId
  public userID: ObjectId
  public contents: string
  public dateCreated: Date
  public user: User
  private procudures: Procedures

  constructor(procedures: Procedures) {
    this.procudures = procedures
  }

  public async load(id: ObjectId): Promise<Tweet> {
    this.fromDbObject(await this.procudures.tweet_get_byId(id))
    return this
  }

  public fromDbObject(tweet: ITweetSchema): Tweet {
    this.id = tweet._id
    this.userID = tweet.userID
    this.contents = tweet.contents
    this.dateCreated = tweet.dateCreated
    if (tweet.user) {
      this.user = new User(this.procudures).fromDbObject(tweet.user)
    }
    return this
  }

  public get safeData(): ITweetSafeData {
    return {
      id: this.id.toString(),
      userID: this.userID.toString(),
      contents: this.contents,
      dateCreated: this.dateCreated,
      user: this.user ? this.user.safeData : null
    }
  }
}
