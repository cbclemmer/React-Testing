import User from '../classes/user'

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
