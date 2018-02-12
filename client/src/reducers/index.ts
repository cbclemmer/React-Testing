import { combineReducers } from 'redux'
import { Action } from '../actions'
import User from '../classes/user'

export default combineReducers({
  counter: (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  },
  userName: (state = '', action) => {
    switch (action.type) {
      case 'UPDATE_TEXT':
        return action.text
      default:
        return state
    }
  },
  user: (state = new User(), action) => {
    switch (action.type) {
      case Action.REGISTER_USER:
        return User.fromRegisterModel(action.model)
      default:
        return state
    }
  }
})
