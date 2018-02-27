import { connect } from 'react-redux'
import { extend, pick } from 'lodash'

import UserP from '../pages/user'
import User, { IAPIUser } from '../classes/user'
import * as api from '../utils/api'
import { logout } from '../actions'
import actions from '../actions'

import { createStore, combineReducers } from 'redux'

export class UserPage {
  public loaded: boolean = false
  public user = new User()

  public load(user: IAPIUser) {
    this.user.load(user)
    this.loaded = true
  }
}

export default connect(
  (state: any) => {
    return extend(pick(state.userPage.user, ['email', 'userName', 'id']), {
      loaded: state.userPage.loaded
    })
  },
  (dispatch, props: any) => ({
    load: async () => {
      const { error, user } = await api.get('/api/users/' + props.match.params.id)
      if (error) {
        return
      }
      dispatch(actions.userPage.actions.load(user))
    }
  })
)(UserP)
