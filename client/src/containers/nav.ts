import * as toastr from 'toastr'

import { connect } from 'react-redux'

import Nav from '../page-partials/nav'
import * as api from '../utils/api'
import { logout } from '../actions'

export default connect(
  (state: any) => ({
    isAuthenticated: state.isAuthenticated,
    userId: state.user.id
  }),
  (dispatch, props) => ({
    signOut: async (e: any, history: any) => {
      e.preventDefault()
      const { error } = await api.post('user/logout')
      if (error) {
        return
      }
      history.push('/')
      toastr.success('Logged Out')
      dispatch(logout())
    }
  })
)(Nav)
