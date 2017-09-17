import '../polyfills'
import React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { ApolloClient } from 'react-apollo'

import Routes from './Routes'

const initApp = () => {
  const client = getClient()
  renderApp(client)
}

const getClient = () => {
  const client = new ApolloClient({
    initialState: window.__APOLLO_STATE__,
  })

  delete window.__APOLLO_STATE__

  return client
}

const renderApp = (client) => {
  ReactDOM.render(
    render(client),
    document.getElementById('root')
  )
}

const render = (client) => {
  return (
    <BrowserRouter>
      <Routes client={client} />
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
