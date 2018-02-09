import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import Increment from './containers/increment'

const store = createStore(reducers)

render(
  <Provider store={store}>
    <Increment />
  </Provider>,
  document.getElementById('example')
)
