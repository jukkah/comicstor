import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

import { enableGraphiQL } from '../config'
import schema from './schema'
import serverRender from './server-side-render'

const app = express()
app.disable('x-powered-by')

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
if (enableGraphiQL) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

app.use(serverRender())

export default app
