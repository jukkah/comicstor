import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import getStore from './store'
import Main from '../client/components/Main';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default () => {
  return (...args) => {
    return serverSideRender(...args).catch(e => {
      if (!res.headersSent) res.status(500)
      res.send('Server error')
      console.error('[500]', e)
    })
  }
}

const serverSideRender = async (req, res, next) => {
  const context = await getContext(req)
  const content = render({ context, location: req.url })

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.status(context.status || 200)
    res.send(template({
      body: content,
      title: context.title,
      state: context.store.getState().toJS()
    }));
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
  const serverStore = await getStore
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

const template = ({ title = '', body = '', state = {} }) => {
  const styles = assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ''

  return (`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        ${styles}
        <script async src="${assets.client.js}"></script>
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
}
