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
