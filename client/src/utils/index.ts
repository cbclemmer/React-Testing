import User from '../classes/user'
import Session from '../classes/session'
import { loadUser, loadSession } from '../actions'

export function Authenticate(dispatch: any, history: any, res: any) {
  const user = new User(res.user.id, res.user.userName, res.user.email)
  const session = new Session(res.session.id, res.session.userId)
  localStorage.setItem('sessionId', session.id)
  localStorage.setItem('sessionUser', session.userId)
  dispatch(loadUser(user))
  dispatch(loadSession(session))
  history.push('/user/' + user.id)
}
