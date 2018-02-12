import { RegisterModel } from '../pages/register'

export default class User {
  public static fromRegisterModel(model: RegisterModel) {
    const user = new User()
    user.userName = model.userName.value
    user.email = model.userName.value

    return user
  }

  public userName: string
  public email: string
}
