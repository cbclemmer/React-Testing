import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import About from './components/about'
import Increment from './containers/increment'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { NativeRouter } from 'react-router-native'

const store = createStore(reducers)

const App = () => (
  <div>
    <nav>
      <Link to="home">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <div>
      <Switch>
        <Route path="/home" component={Increment} />
        <Route path="/about" component={About} />
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
  document.getElementById('example')
)
