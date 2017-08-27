import './polyfills'

import app from './server'
import http from 'http'

let currentApp = app

const server = http.createServer(app)
server.on('listening', () => {
  console.log(`Server listening at http://localhost:${server.address().port}`)
})
server.listen(process.env.PORT || 3000)

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}
