import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { store as serverStore } from '../back-end/store'
import Main from './components/Main'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const template = ({ title = '', body = '', state = {} }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
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
`)

export default function serverRenderer() {
  return (req, res, next) => {
    const reducer = state => state
    const store = createStore(reducer, serverStore.getState())

    const muiTheme = getMuiTheme({}, {
      userAgent: req.headers['user-agent'],
    })

    const state = store.getState().toJS()
    const title = 'Hello World'
    const body = renderToString(
      <Main store={store} muiTheme={muiTheme} />
    )

    res.send(template({ title, body, state }))
  }
}
