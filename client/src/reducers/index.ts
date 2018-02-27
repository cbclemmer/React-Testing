import { combineReducers, ReducersMapObject } from 'redux'
import { extend } from 'lodash'

import { Action } from '../actions'
import User from '../classes/user'
import { reducers as userPageReducers } from '../containers/user'

const globalReducers: ReducersMapObject = {
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
}

export default combineReducers(extend(
  globalReducers,
  userPageReducers
))
