import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../client/App'

const template = ({ body, title }) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      <div id="root">${body}</div>
    </body>
    <script src="/client.js"></script>
  </html>
`);

export default function render(req, res) {
  const body = renderToString(<App />)
  const content = template({ body, title: 'Hello World' })
  res.send(content)
}
