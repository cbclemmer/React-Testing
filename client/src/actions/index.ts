import User, { IAPIUser } from '../classes/user'

export enum Action {
  AUTHENTICATE,
  LOGOUT
}

export function authenticate(user: User) {
  return {
    type: Action.AUTHENTICATE,
    user
  }
}

export function logout() {
  return {
    type: Action.LOGOUT
  }
}

enum userPageAction {
  LOAD
}

const userPage = {
  load: (user: IAPIUser) => ({
    type: userPageAction.LOAD,
    user
  })
}

export default {
  Action,
  authenticate,
  logout,

  userPage: {
    types: userPageAction,
    actions: userPage
  }
}
