import * as React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <nav>
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/home">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
    </ul>
  </nav>
)
