import * as React from 'react'
import { Route } from 'react-router-dom'
import { FormGroup, Input, Button } from 'reactstrap'

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
        <FormGroup>
          <label>Email</label>
          <input ref={(node) => { page.email = node }} type="email" className="form-control" placeholder="Email..." />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <input ref={(node) => { page.password = node }} type="password" className="form-control" placeholder="Password..." />
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </FormGroup>
      </form>
    )} />
  )
}
