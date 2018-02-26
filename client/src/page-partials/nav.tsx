import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const loggedIn = (props: any) =>
  <ul className="nav">
    <li className="nav-item">
      <Link className="nav-link" to="/home">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={'/user/' + props.userId}>Profile</Link>
    </li>
    <li className="nav-item">
      <Button color="link" onClick={(e) => props.signOut(e)}>Sign Out</Button>
    </li>
  </ul>

const notLoggedIn = () =>
  <ul className="nav">
    <li className="nav-item">
      <Link className="nav-link" to="/home">Home</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/login">Log In</Link>
      </li>
    <li className="nav-item">
      <Link className="nav-link" to="/register">Sign Up</Link>
    </li>
  </ul>

export default (props: any) =>
  <nav>
    {props.isAuthenticated ? loggedIn(props) : notLoggedIn()}
  </nav>
