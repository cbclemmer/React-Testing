import * as React from 'react'
import { Button, Card, CardBody, CardText, CardSubtitle, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { map } from 'lodash'

import Tweet from '../../classes/tweet'
import { UserPage } from './index'

const tweetForm = (page: UserPage) =>
  <div>
    <textarea id="tweet-area" onChange={page.handleChange.bind(page)} className="form-control"></textarea>
    <span style={{ color: page.state.isOverLength ? 'red' : 'black', float: 'right' }}>
    {page.state.contents.length}/140
    </span>
    <br />
    <Button color="primary" onClick={page.sendTweet.bind(page)} disabled={page.state.isOverLength}>
      Send Tweet
    </Button>
  </div>

const tweet = (data: Tweet) =>
  <Card key={data.id} className="form-group">
    <div className="card-body">
      <CardSubtitle>
        <Link to={'/users/' + data.user.id}>@{data.user.userName}</Link> - {data.dateCreated ? new Date(data.dateCreated).toDateString() : ''}
      </CardSubtitle>
      <CardText>
        {data.contents}
      </CardText>
    </div>
  </Card>

export default (page: UserPage) => {
  return page.state.loaded ? (
    <div>
      <Link to={'/user/' + page.state.user.id}>@{page.state.user.userName}</Link>
      <br />
      {page.state.isSelf ? tweetForm(page) : ''}
      <br />
      {map(page.state.tweets, (t) => tweet(t))}
    </div>
  ) : <span></span>
}
