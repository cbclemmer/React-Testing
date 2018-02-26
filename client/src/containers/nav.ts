import { connect } from 'react-redux'
import { signOut } from '../actions'
import Nav from '../page-partials/nav'
import * as api from '../utils/api'

export default connect(
  (state: any) => ({
    isAuthenticated: state.isAuthenticated,
    userId: state.user.id
  }),
  (dispatch, props) => ({
    signOut: async (e: any) => {
      e.preventDefault()
      const { error } = await api.post('user/signout')
      if (error) {
        return
      }
      dispatch(signOut())
    }
  })
)(Nav)
