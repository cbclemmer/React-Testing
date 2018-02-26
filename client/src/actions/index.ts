import User from '../classes/user'
import Session from '../classes/session'

export enum Action {
  AUTHENTICATE,
  SIGNOUT,

  LOAD_USER,
  LOAD_SESSION
}

export function authenticate(user: User) {
  return {
    type: Action.AUTHENTICATE,
    user
  }
}

export function signOut() {
  return {
    type: Action.SIGNOUT
  }
}

// OLD --------------------------------

export function increment() {
  return {
    type: 'INCREMENT'
  }
}
export function decrement() {
  return {
    type: 'DECREMENT'
  }
}

export function updateText(text: string): any {
  return {
    type: 'UPDATE_TEXT',
    text
  }
}

export function loadUser(user: User) {
  return {
    type: Action.LOAD_USER,
    user
  }
}

export function loadSession(session: Session) {
  return {
    type: Action.LOAD_SESSION,
    session
  }
}
