import { combineReducers } from 'redux'
import { Action } from '../actions'
import User from '../classes/user'
import Session from '../classes/session'

export default combineReducers({
  isAuthenticated: (state = null, { type }) => {
    switch (type) {
      case Action.AUTHENTICATE:
        return true
      case Action.SIGNOUT:
        return false
      default:
        return state
    }
  },
  user: (state = new User(), { type, user }) => {
    switch (type) {
      case Action.AUTHENTICATE:
        return user
      case Action.SIGNOUT:
        return new User()
      default:
        return state
    }
  },

  // OLD ---------------------------------------
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

  session: (state = new Session(), action) => {
    switch (action.type) {
      case Action.LOAD_SESSION:
        return action.session
      default:
        return state
    }
  }
})
