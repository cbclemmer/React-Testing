import { combineReducers } from 'redux'
import { Action } from '../actions'
import User from '../classes/user'
import Session from '../classes/session'

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
      case Action.LOAD_USER:
        return action.user
      default:
        return state
    }
  },
  session: (state = new Session(), action) => {
    switch (action.type) {
      case Action.LOAD_SESSION:
        return action.session
      default:
        return state
    }
  },
  isAuthenticated: (state = false, action) => {
    switch (action.type) {
      case Action.LOAD_SESSION:
        return true
      default:
        return state
    }
  }
})
