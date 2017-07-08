import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import serverStore from './store'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Main from '../client/Main'
import App from '../client/App'

const template = ({ title = '', body = '', state = {} }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <script async src="/client.js"></script>
    </head>
    <body>
      <div id="root">${body}</div>
      <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};
      </script>
    </body>
  </html>
`);

export default function render(req, res) {
  const reducer = state => state
  const store = createStore(reducer, serverStore.getState())

  const muiTheme = getMuiTheme({}, {
    userAgent: req.headers['user-agent'],
  })

  const state = store.getState().toJS()
  const title = 'Hello World'
  const body = renderToString(
    <Main store={store} muiTheme={muiTheme}>
      <App />
    </Main>
  )

  res.send(template({ title, body, state }))
}
