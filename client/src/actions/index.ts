import User, { IAPIUser } from '../classes/user'
import userPage from './user'

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

export default {
  Action,
  authenticate,
  logout,

  userPage
}
