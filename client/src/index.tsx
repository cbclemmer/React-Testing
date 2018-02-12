import * as bootstrap from 'bootstrap'
import * as $ from 'jquery'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import Register from './containers/register'

import Nav from './page-partials/nav'
import Home from './pages/home'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { NativeRouter } from 'react-router-native'

const store = createStore(reducers)

const App = () => (
  <div>
    <Nav />
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </div>
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
