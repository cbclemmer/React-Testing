import { connect } from 'react-redux'
import { loadUser, loadSession } from '../actions'
import Register, { RegisterModel } from '../pages/register'
import User from '../classes/user'
import Session from '../classes/session'
import { Authenticate } from '../utils/'
import * as api from '../utils/api'

export default connect(
  () => ({ }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: RegisterModel, history: any) => {
      e.preventDefault()
      const res = await api.post('user/register', model.toStrings())
      if (res.error) {
        return
      }
      Authenticate(dispatch, history, res)
    }
  })
)(Register)
