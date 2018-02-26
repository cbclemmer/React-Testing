import { connect } from 'react-redux'
import { loadUser, loadSession } from '../actions'
import Login, { LoginModel } from '../pages/login'
import User from '../classes/user'
import Session from '../classes/session'
import * as api from '../utils/api'
import { authenticate } from '../actions'

export default connect(
  () => ({ }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: LoginModel, history: any) => {
      e.preventDefault()
      const { error, user } = await api.post('user/login', model.toStrings())
      if (error) {
        return
      }
      dispatch(authenticate(user))
    }
  })
)(Login)
