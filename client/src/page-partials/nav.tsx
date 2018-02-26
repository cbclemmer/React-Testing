import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'

const loggedIn = (props: any, history: any) =>
  <Nav>
    <NavItem>
      <Link className="nav-link" to="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link className="nav-link" to={'/user/' + props.userId}>Profile</Link>
    </NavItem>
    <NavItem>
      <Button color="link" onClick={(e) => props.signOut(e, history)}>Log Out</Button>
    </NavItem>
  </Nav>

const notLoggedIn = () =>
  <Nav>
    <NavItem>
    <Link className="nav-link" to="/">Home</Link>
    </NavItem>
    <NavItem>
    <Link className="nav-link" to="/login">Log In</Link>
    </NavItem>
    <NavItem>
      <Link className="nav-link" to="/register">Sign Up</Link>
    </NavItem>
  </Nav>

export default (props: any) =>
  <Route render={(ctx: any) => (
    <span>
    {props.isAuthenticated ? loggedIn(props, ctx.history) : notLoggedIn()}
    </span>
  )} />
