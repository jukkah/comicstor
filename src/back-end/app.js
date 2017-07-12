import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

import { enableGraphiQL } from '../config'
import schema from './schema'
import serverRender from '../front-end/server'

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

if (enableGraphiQL) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

app.use(express.static(path.join(__dirname, '../../dist/public')))

app.use(serverRender())

export default app
