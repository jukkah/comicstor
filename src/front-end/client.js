import React from 'react'
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore } from 'redux'

import Main from './components/Main'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initApp)
} else {
  initApp()
}

function initApp() {
  const preloadedState = fromJS(window.__PRELOADED_STATE__)
  delete window.__PRELOADED_STATE__

  const reducer = state => state
  const store = createStore(
    reducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  renderApp(store)
}

function renderApp(store) {
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('root')
  )
}
