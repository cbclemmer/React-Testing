import { RegisterModel } from '../pages/register'

export enum Action {
  REGISTER_USER
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

export function registerUser(model: RegisterModel) {
  return {
    type: Action.REGISTER_USER,
    model
  }
}
