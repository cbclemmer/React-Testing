import { connect } from 'react-redux'
import { registerUser, loadSession } from '../actions'
import Register, { RegisterModel } from '../pages/register'
import User from '../classes/user'
import Session from '../classes/session'
import * as api from '../utils/api'

export default connect(
  (state: any) => ({
    userName: state.userName
  }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: RegisterModel, history: any) => {
      e.preventDefault()
      const res = await api.post('user/register', model.toStrings())
      if (res.error) {
        return
      }
      const user = new User(res.user.id, res.user.userName, res.user.email)
      const session = new Session(res.session.id, res.session.userId)
      localStorage.setItem('sessionId', session.id)
      localStorage.setItem('sessionUser', session.userId)
      dispatch(registerUser(res.user))
      dispatch(loadSession(res.session))
      history.push('/user/' + user.id)
    }
  })
)(Register)
