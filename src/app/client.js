import React from 'react'
import { render } from 'react-dom';
import { fromJS } from 'immutable'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore } from 'redux'

import Main from './components/Main'
import App from './components/App'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", renderApp)
} else {
  renderApp()
}

function renderApp() {
  const preloadedState = fromJS(window.__PRELOADED_STATE__)
  delete window.__PRELOADED_STATE__

  const reducer = state => state
  const store = createStore(
    reducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  render(
    <Main store={store}>
      <App />
    </Main>,
    document.getElementById('root')
  )
}
