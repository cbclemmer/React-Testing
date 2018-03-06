import * as React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { UserPage } from './index'

const tweetForm = (page: UserPage) =>
  <div>
    <textarea onChange={page.handleChange.bind(page)} className="form-control"></textarea>
    <br />
    <Button color="primary">
      Send Tweet
    </Button>
  </div>

export default (page: UserPage) => {
  return page.state.loaded ? (
    <div>
      <Link to={'/user/' + page.state.user.id}>@{page.state.user.userName}</Link>
      <br />
      {page.state.isSelf ? tweetForm(page) : ''}
    </div>
  ) : <span></span>
}
