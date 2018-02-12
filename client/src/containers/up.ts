import * as React from 'react'
import { connect } from 'react-redux'
import Button from '../components/button'

import { increment } from '../actions'

export default connect(
  () => ({ }), // Nothing to map
  (dispatch, ownProps) => {
    return {
      onClick: () => {
        dispatch(increment())
      }
    }
  }
)(Button)
