import * as React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import User from '../../classes/user'
import * as api from '../../utils/api'

const tweetForm = (t: any) =>
  <div>
    <textarea onChange={t.handleChange.bind(t)} className="form-control"></textarea>
    <br />
    <Button color="primary">
      Send Tweet
    </Button>
  </div>

interface IUserPageState {
  user: User,
  value: string,
  loaded: boolean,
  isSelf: boolean
}

export default class extends React.Component {
  public props: any
  public state: IUserPageState

  constructor(props: any) {
    super(props)
    this.props = props
    this.state = {
      user: null,
      value: '',
      loaded: false,
      isSelf: false
    }
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

  public handleChange(event: any) {
    this.setState({ value: event.target.value})
  }

  public render() {
    console.log(this.state)
    return this.state.loaded ? (
      <div>
        <Link to={'/user/' + this.state.user.id}>@{this.state.user.userName}</Link>
        <br />
        {this.state.isSelf ? tweetForm(this) : ''}
      </div>
    ) : <span></span>
  }
}
