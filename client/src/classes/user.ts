interface IAPIUser {
  id: string,
  userName: string,
  email: string
}

export default class User {
  public id: string
  public userName: string
  public email: string
  public loaded: boolean = false

  constructor(data: IAPIUser = null) {
    if (data) {
      this.id = data.id
      this.userName = data.userName
      this.email = data.email
      this.loaded = true
    }
  }

  public load(data: IAPIUser) {
    this.id = data.id
    this.userName = data.userName
    this.email = data.email
    this.loaded = true
  }
}
