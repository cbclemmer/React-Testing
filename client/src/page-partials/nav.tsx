import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { Button } from 'reactstrap'

const loggedIn = (props: any, history: any) =>
  <ul className="nav">
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={'/user/' + props.userId}>Profile</Link>
    </li>
    <li className="nav-item">
      <Button color="link" onClick={(e) => props.signOut(e, history)}>Log Out</Button>
    </li>
  </ul>

const notLoggedIn = () =>
  <ul className="nav">
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/login">Log In</Link>
      </li>
    <li className="nav-item">
      <Link className="nav-link" to="/register">Sign Up</Link>
    </li>
  </ul>

export default (props: any) =>
  <Route render={(ctx: any) => (
  <nav>
    {props.isAuthenticated ? loggedIn(props, ctx.history) : notLoggedIn()}
  </nav>
  )} />
