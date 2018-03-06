import { ReducersMapObject } from 'redux'
import { connect } from 'react-redux'
import { extend, pick } from 'lodash'

import User, { IAPIUser } from '../../classes/user'
import * as api from '../../utils/api'
import { logout } from '../../actions'
import template from './template'

import { createStore, combineReducers, AnyAction } from 'redux'

enum Types {
  LOAD = 'USER_PAGE_LOAD'
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
  (state: any, props: any) => {
      return {
        userID: state.user.id,
        loaded: state.userPage_loaded,
        userName: state.userPage_userName,
        isSelf: state.user.id === props.match.params.id
      }
    },
  (dispatch, props: any) => ({
    load: async () => {
      const { error, user } = await api.get('/api/users/' + props.match.params.id)
      if (error) {
        return
      }
      const u = new User(user)
      dispatch(actions.load(u))
    }
  })
)(template)
