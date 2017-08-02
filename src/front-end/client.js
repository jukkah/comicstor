import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { fromJS } from 'immutable'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore } from 'redux'

import Main from './components/Main'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const initApp = () => {
  const store = getStore()
  renderApp(store)
}

const getStore = () => {
  const preloadedState = fromJS(window.__PRELOADED_STATE__)
  delete window.__PRELOADED_STATE__

  const reducer = state => state
  return createStore(
    reducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

const renderApp = (store) => {
  ReactDOM.render(
    render(store),
    document.getElementById('root')
  )
}

const render = (store) => {
  return (
    <BrowserRouter>
      <Main store={store} />
    </BrowserRouter>
  )
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initApp)
} else {
  initApp()
}
