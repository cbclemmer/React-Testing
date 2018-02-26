import { combineReducers } from 'redux'
import { Action } from '../actions'
import User from '../classes/user'

export default combineReducers({
  isAuthenticated: (state = null, { type }) => {
    switch (type) {
      case Action.AUTHENTICATE:
        return true
      case Action.LOGOUT:
        return false
      default:
        return state
    }
  },
  user: (state = new User(), { type, user }) => {
    switch (type) {
      case Action.AUTHENTICATE:
        return user
      case Action.LOGOUT:
        return new User()
      default:
        return state
    }
  }
})
