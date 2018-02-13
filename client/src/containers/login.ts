import { connect } from 'react-redux'
import { loadUser, loadSession } from '../actions'
import Login, { LoginModel } from '../pages/login'
import User from '../classes/user'
import Session from '../classes/session'
import * as api from '../utils/api'
import { Authenticate } from '../utils'

export default connect(
  () => ({ }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: LoginModel, history: any) => {
      e.preventDefault()
      const res = await api.post('user/login', model.toStrings())
      if (res.error) {
        return
      }
      Authenticate(dispatch, history, res)
    }
  })
)(Login)
