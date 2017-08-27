import '../polyfills'
import React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { fromJS } from 'immutable'
import { createStore } from 'redux'

import Main from './components/Main'

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

if (module.hot) {
  module.hot.accept()
}
