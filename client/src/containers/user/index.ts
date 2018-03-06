import * as React from 'react'
import { connect } from 'react-redux'

import User from '../../classes/user'
import * as api from '../../utils/api'
import template from './template'

class UserPageState {
  public user: User = null
  public value: string = ''
  public loaded: boolean = false
  public isSelf: boolean = false
}

export class UserPage extends React.Component {
  public props: any
  public state: UserPageState = new UserPageState()

  constructor(props: any) {
    super(props)
    this.props = props
    this.load()
  }

  public async load() {
    const { error, user } = await api.get('/api/users/' + this.props.match.params.id)
    if (error) {
      return this.props.history.push('/404')
    }
    this.setState({
      loaded: true,
      user: new User(user),
      isSelf: user.id === this.props.userID
    })
  }

  public handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ value: event.target.value})
  }

  public render() {
    return template(this)
  }
}

export default connect(
  (state: any) => ({ userID: state.user.id }),
  () => ({ })
)(UserPage)
