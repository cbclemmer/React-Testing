import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { NavPart } from './index'

const loggedIn = (page: NavPart) =>
  <Nav>
    <NavItem>
      <Link className="nav-link" to="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link className="nav-link" to={'/user/' + page.props.userId}>Profile</Link>
    </NavItem>
    <NavItem>
      <Button color="link" onClick={(e) => page.props.signOut(e)}>Log Out</Button>
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

export default (page: NavPart) =>
    <span>
    {page.props.isAuthenticated ? loggedIn(page) : notLoggedIn()}
    </span>
