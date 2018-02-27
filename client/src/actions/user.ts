import { IAPIUser } from '../classes/user'

enum userPageAction {
  LOAD
}

export default {
  types: userPageAction,
  actions: {
    load: (user: IAPIUser) => ({
      type: userPageAction.LOAD,
      user
    })
  }
}
