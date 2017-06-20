import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { promisify } from 'util'
import { port, enableGraphiQL } from '../config'
import schema from './schema'
import render from './render'

const server = express();

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

if (enableGraphiQL) {
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

server.use(express.static(path.join(__dirname, '../../dist/public')))

server.use('/', render)

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
})
