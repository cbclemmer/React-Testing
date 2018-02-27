import * as React from 'react'
import { Link } from 'react-router-dom'

import User from '../../classes/user'
import * as api from '../../utils/api'

const header = (props: any) =>
  <div>
    <Link to={'/user/' + props.match.params.id}>@{props.userName}</Link>
  </div>

export default (props: any) => {
  props.load()
  return (
    <div>
      {props.loaded ? header(props) : ''}
      <p>This is the users page id: {props.match.params.id} </p>
    </div>
  )
}
