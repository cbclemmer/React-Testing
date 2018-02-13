import * as React from 'react'
import { Link } from 'react-router-dom'

const loggedIn = () =>
  <ul className="nav">
    <li className="nav-item">
      <Link className="nav-link" to="/home">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={'/user/' + localStorage.getItem('sessionUser')}>Profile</Link>
    </li>
    <li className="nav-item">
      <button className="btn btn-link">Sign Out</button>
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
    {props.isAuthenticated ? loggedIn() : notLoggedIn()}
  </nav>
