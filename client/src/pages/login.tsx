import * as React from 'react'
import { Route } from 'react-router-dom'

export class LoginModel {
  public email: HTMLInputElement
  public password: HTMLInputElement

  public toStrings() {
    return {
      email: this.email.value,
      password: this.password.value
    }
  }
}

export default (props: any) => {
  const page = new LoginModel()

  return (
    <Route render={(ctx: any) => (
      <form onSubmit={(e) => props.onSubmit(e, page, ctx.history)}>
        <div className="form-group">
          <label>Email</label>
          <input ref={(node) => { page.email = node }} type="email" className="form-control" placeholder="Email..." />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input ref={(node) => { page.password = node }} type="password" className="form-control" placeholder="Password..." />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    )} />
  )
}
