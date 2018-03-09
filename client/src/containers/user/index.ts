import * as React from 'react'
import * as toastr from 'toastr'
import * as $ from 'jquery'
import { connect } from 'react-redux'
import { map } from 'lodash'

import User from '../../classes/user'
import Tweet from '../../classes/tweet'
import * as api from '../../utils/api'
import template from './template'
import { IAPITweet } from '../../classes/tweet'

class UserPageState {
  public user: User = null
  public tweets: Tweet[] = []
  public contents: string = ''
  public loaded: boolean = false
  public isSelf: boolean = false
  public isOverLength: boolean = false
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
    const id = this.props.match.params.id
    const userRes = await api.get('/api/users/' + id)
    if (userRes.error) {
      return this.props.history.push('/404')
    }
    await this.loadTweets()
    this.setState({
      loaded: true,
      user: new User(userRes),
      isSelf: userRes.id === this.props.userID
    })
  }

  public async loadTweets() {
    const id = this.props.match.params.id
    const tweetRes = await api.get('/api/tweets/' + id)
    this.setState({
      tweets: tweetRes.error
      ? []
      : map(tweetRes, (t: IAPITweet) => new Tweet(t))
    })
  }

  public handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      isOverLength: event.target.value.length > 140,
      contents: event.target.value
    })
  }

  public async sendTweet() {
    const { error } = await api.post('/api/tweets/create', { contents: this.state.contents })
    if (error) {
      return
    }
    this.setState({ contents: '' })
    $('#tweet-area').val('')
    await this.loadTweets()
    toastr.success('Tweeted')
  }

  public render() {
    return template(this)
  }
}

export default connect(
  (state: any) => ({ userID: state.user.id }),
  () => ({ })
)(UserPage)
