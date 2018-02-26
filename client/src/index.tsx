import * as bootstrap from 'bootstrap'
import * as $ from 'jquery'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import Register from './containers/register'
import Login from './containers/login'
import Nav from './containers/nav'

import Home from './pages/home'
import User from './pages/user'
import NoMatch from './pages/noMatch'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { NativeRouter } from 'react-router-native'

import * as api from './utils/api'
import { authenticate } from './actions'

const store = createStore(reducers)

const App = () => (
  <div>
    <Nav />
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/:id" component={User}/>
        <Route component={NoMatch} />
      </Switch>
    </div>
  </div>
)

const main = async () => {
  const { error, user } = await api.get('/user/auth')
  if (!error) {
    store.dispatch(authenticate(user))
  }
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
}

main()
