import * as toastr from 'toastr'

import { connect } from 'react-redux'

import User from '../classes/user'
import * as api from '../utils/api'
import Register, { RegisterModel } from '../pages/register'
import { authenticate } from '../actions'

export default connect(
  () => ({ }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: RegisterModel, history: any) => {
      e.preventDefault()
      const { error, user } = await api.post('/api/user/register', model.toStrings())
      if (error) {
        return
      }
      const u = new User(user)
      dispatch(authenticate(u))
      toastr.success('Reigstered User')
      history.push('/users/' + u.id)
    }
  })
)(Register)
