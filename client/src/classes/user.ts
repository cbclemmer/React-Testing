export default class User {
  public id: string
  public userName: string
  public email: string
  public loaded: boolean = false

  constructor(id: string = null, userName: string = null, email: string = null) {
    this.id = id
    this.userName = userName
    this.email = email
    if (this.id && this.userName && this.email) {
      this.loaded = true
    }
  }
}
