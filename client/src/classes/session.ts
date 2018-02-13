export default class Session {
  public id: string
  public userId: string
  public loaded: boolean = false

  constructor(id: string = null, userId: string = null) {
    this.id = id
    this.userId = userId
    if (this.id && this.userId) {
      this.loaded = true
    }
  }
}
