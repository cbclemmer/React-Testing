import User from '../classes/user'
import Session from '../classes/session'

export enum Action {
  LOAD_USER,
  LOAD_SESSION
}

export interface IAction {
  type: string
}

export function increment(): IAction {
  return {
    type: 'INCREMENT'
  }
}
export function decrement(): IAction {
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
