import http from 'http'

import app from '../back-end/app'
import { port } from '../config'

let currentApp = app

const server = http.createServer(app)
server.on('listening', () => {
  console.log(`Server listening on ${server.address()}`)
})
server.on('close', () => {
  console.log(`Server closed`)
})
server.listen(port)

if (module.hot) {
  module.hot.accept('../back-end/app', app => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })

  module.hot.accept('../config', ({ port }) => {
    if (server.listeing) {
      server.close(() => {
        if (!server.listening) {
          server.listen(port)
        }
      })
    } else {
      server.listen(port)
    }
  })
}
