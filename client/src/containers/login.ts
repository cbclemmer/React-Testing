import * as toastr from 'toastr'

import { connect } from 'react-redux'

import User from '../classes/user'
import * as api from '../utils/api'
import { authenticate } from '../actions'
import Login, { LoginModel } from '../pages/login'

export default connect(
  () => ({ }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: LoginModel, history: any) => {
      e.preventDefault()
      const { error, user } = await api.post('/api/user/login', model.toStrings())
      if (error) {
        return
      }
      const u = new User(user)
      dispatch(authenticate(u))
      toastr.success('Logged In')
      history.push('/user/' + u.id)
    }
  })
)(Login)
