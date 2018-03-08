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
      const res = await api.post('/api/user/register', model.toStrings())
      if (res.error) {
        return
      }
      const u = new User(res)
      dispatch(authenticate(u))
      toastr.success('Reigstered User')
      history.push('/user/' + u.id)
    }
  })
)(Register)
