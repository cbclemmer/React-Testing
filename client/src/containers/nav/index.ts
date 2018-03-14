import { Component } from 'react'
import * as toastr from 'toastr'

import { connect } from 'react-redux'

import Nav from '../../page-partials/nav'
import * as api from '../../utils/api'
import { logout } from '../../actions'
import template from './template'

class NavPartState {

}

export class NavPart extends Component {
  public props: any
  public state: NavPartState = new NavPartState()

  constructor(props: any) {
    super(props)
    this.props = props
  }

  public render() {
    return template(this)
  }
}

export default connect(
  (state: any) => ({
    isAuthenticated: state.isAuthenticated,
    userId: state.user.id
  }),
  (dispatch, props: any) => ({
    signOut: async (e: any) => {
      e.preventDefault()
      const { error } = await api.post('/api/user/logout')
      if (error) {
        return
      }
      props.history.push('/')
      toastr.success('Logged Out')
      dispatch(logout())
    }
  })
)(NavPart)
