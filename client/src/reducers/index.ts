import { combineReducers } from 'redux'
import actions, { Action } from '../actions'
import User from '../classes/user'
import { UserPage } from '../containers/user'

const userPage = actions.userPage

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
  },
  userPage: (state = new UserPage(), { type, user }) => {
    switch (type) {
      case userPage.types.LOAD:
        state.load(user)
        return state
      default:
        return state
    }
  }
})
