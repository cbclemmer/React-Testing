import * as React from 'react'
import { Link } from 'react-router-dom'

import User from '../../classes/user'
import * as api from '../../utils/api'

const tweetForm = (props: any) =>
  <div>
    <textarea className="form-control"></textarea>
  </div>

export default (props: any) => {
  props.load()
  console.log(props.isSelf)
  return props.loaded ? (
    <div>
      <Link to={'/user/' + props.match.params.id}>@{props.userName}</Link>
      <br />
      {props.isSelf ? tweetForm(props) : ''}
    </div>
  ) : <span></span>
}
