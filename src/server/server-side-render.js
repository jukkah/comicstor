import React from 'react'
import { StaticRouter } from 'react-router-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { ApolloClient, renderToStringWithData } from 'react-apollo'
import { createLocalInterface } from 'apollo-local-query'
import * as graphql from 'graphql'

import schema from './schema'
import Routes from '../client/Routes'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

export default () => {
  return (req, res, next) => {
    return serverSideRender(req, res, next).catch(e => {
      if (!res.headersSent) res.status(500)
      res.send('Server error')
      console.error('[500]', e)
    })
  }
}

const serverSideRender = async (req, res, next) => {
  const context = await getContext(req)
  const app = render({ context, location: req.url })
  const content = await renderToStringWithData(app)
  const initialState = { apollo: context.client.getInitialState() }

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    res.status(context.status || 200)
    res.send(template({
      body: content,
      title: context.title,
      initialState
    }))
  }
}

const getContext = async (req) => {
  return {
    title: 'Comicstor App',
    theme: getTheme(req),
    client: getClient(),
  }
}

const getClient = () => {
  return new ApolloClient({
    networkInterface: createLocalInterface(graphql, schema),
    ssrMode: true,
  })
}

const getTheme = (req) => {
  return getMuiTheme({}, {
    userAgent: req.headers['user-agent'],
  })
}

const render = ({ context, location }) => {
  return (
    <StaticRouter location={location} context={context}>
      <Routes client={context.client} muiTheme={context.theme} />
    </StaticRouter>
  )
}

const template = ({ title = '', body = '', initialState = {} }) => {
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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        ${styles}
        <script async src="${assets.client.js}"></script>
      </head>
      <body style="margin:0">
        <div id="root">${body}</div>
        <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__APOLLO_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
        </script>
      </body>
    </html>
  `)
}
