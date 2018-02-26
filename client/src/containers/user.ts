import { connect } from 'react-redux'

import UserPage from '../pages/user'
import User from '../classes/user'
import * as api from '../utils/api'
import { logout } from '../actions'

export default connect(
  (state: any) => ({
    userData: new User()
  }),
  (dispatch, props: any) => ({
    load: async () => {
      const { error, user } = await api.get('/api/user/' + props.match.params.id)
      if (error) {
        return
      }
      props.userData.load(user)
    }
  })
)(UserPage)
