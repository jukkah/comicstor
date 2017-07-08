import { fromJS } from 'immutable'
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore } from 'redux'
import Main from './Main'
import App from './App'

const preloadedState = fromJS(window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__

const reducer = state => state
const store = createStore(
  reducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Main store={store}>
    <App />
  </Main>,
  document.getElementById('root')
)
