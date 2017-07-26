import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createStore } from 'redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { getStore } from '../back-end/store'
import Main from './components/Main'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default function serverRenderer() {
  return async (req, res, next) => {
    const context = await getContext(req)
    const content = render({ context, location: req.url })

    if (context.url) {
      res.redirect(301, context.url)
    } else {
      res.send(template({
        body: content,
        title: context.title,
        state: context.store.getState().toJS()
      }))
    }
  }
}

const getContext = async (req) => {
  return {
    title: 'Comicstor App',
    store: await getClientStore(),
    theme: getTheme(req),
  }
}

const getClientStore = async () => {
  const reducer = state => state
  const serverStore = await getStore()
  return createStore(reducer, serverStore.getState())
}

const getTheme = (req) => {
  return getMuiTheme({}, {
    userAgent: req.headers['user-agent'],
  })
}

const render = ({ context, location }) => {
  return renderToString(
    <StaticRouter location={location} context={context}>
      <Main store={context.store} muiTheme={context.theme} />
    </StaticRouter>
  )
}

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
