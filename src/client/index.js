import { fromJS } from 'immutable'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

const preloadedState = fromJS(window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__

const reducer = state => state
const store = createStore(
  reducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
