import * as React from 'react'
import { connect } from 'react-redux'
import { updateText } from '../actions'
import { Route } from 'react-router-dom'

export class RegisterModel {
  public userName: HTMLInputElement
  public email: HTMLInputElement
  public password: HTMLInputElement
  public confirmPassword: HTMLInputElement

  public toStrings() {
    return {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }
  }
}

export default (props: any) => {
  const page = new RegisterModel()

  return (
    <Route render={(ctx: any) => (
      <form onSubmit={(e) => props.onSubmit(e, page, ctx.history)}>
        <div className="form-group">
          <label>User name</label>
          <input ref={(node) => { page.userName = node }} type="text" className="form-control" placeholder="User name..." />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input ref={(node) => { page.email = node }} type="email" className="form-control" placeholder="Email..." />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input ref={(node) => { page.password = node }} type="password" className="form-control" placeholder="Password..." />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input ref={(node) => { page.confirmPassword = node }} type="password" className="form-control" placeholder="Confirm Password..." />
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
