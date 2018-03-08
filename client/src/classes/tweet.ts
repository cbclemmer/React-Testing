import User, { IAPIUser } from './user'

export interface IAPITweet {
  id: string
  userID: string
  contents: string
  dateCreated: Date
  user?: IAPIUser
}

export default class Tweet {
  public id: string
  public userID: string
  public contents: string
  public dateCreated: Date
  public user: User

  constructor(data: IAPITweet = null) {
    if (data) {
      this.id = data.id
      this.userID = data.userID
      this.contents = data.contents
      this.dateCreated = data.dateCreated
      if (data.user) {
        this.user = new User(data.user)
      }
    }
  }
}
