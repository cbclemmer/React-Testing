import { connect } from 'react-redux'
import { authenticate } from '../actions'
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
      const { error, user } = await api.post('user/register', model.toStrings())
      if (error) {
        return
      }
      dispatch(authenticate(user))
    }
  })
)(Register)
