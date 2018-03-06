import { ReducersMapObject } from 'redux'
import { connect } from 'react-redux'
import { extend, pick } from 'lodash'

import User, { IAPIUser } from '../../classes/user'
import * as api from '../../utils/api'
import { logout } from '../../actions'
import template from './template'

import { createStore, combineReducers, AnyAction } from 'redux'

enum Types {
  LOAD = 'USER_PAGE_LOAD',
  UPDATE_TWEET = 'USER_PAGE_UPDATE_TWEET'
}

const actions = {
  load: (user: IAPIUser) => ({
    type: Types.LOAD,
    user
  })
}

export const reducers: ReducersMapObject = {
  userPage_userName: (state: string = '', { type, user }) => {
    switch (type) {
      case Types.LOAD:
        return user.userName
      default:
        return state
    }
  },
  userPage_loaded: (state: boolean = false, { type, user }) => {
    switch (type) {
      case Types.LOAD:
        return true
      default:
        return state
    }
  }
}

export default connect(
  (state: any, props: any) => ({ userID: state.user.id }),
  (dispatch, props: any) => ({ })
)(template)
