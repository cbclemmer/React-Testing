import { connect } from 'react-redux'
import { registerUser } from '../actions'
import Register, { RegisterModel } from '../pages/register'
import * as api from '../utils/api'

export default connect(
  (state: any) => ({
    userName: state.userName
  }),
  (dispatch, props) => ({
    onSubmit: async (e: React.FormEvent<HTMLFormElement>, model: RegisterModel) => {
      e.preventDefault()
      const c = await api.post('user/register', model.toStrings())
      console.log(c)
      dispatch(registerUser(model))
    }
  })
)(Register)
