import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/App'

const template = ({ title = '', body = '', state = {} }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
    </head>
    <body>
      <div id="root">${body}</div>
      <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
    </body>
    <script src="/client.js"></script>
  </html>
`);

export default function render(req, res) {
  const title = 'Hello World'
  const body = renderToString(<App />)
  const state = {}
  const content = template({ title, body, state })
  res.send(content)
}
