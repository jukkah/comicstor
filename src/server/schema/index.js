import { makeExecutableSchema } from 'graphql-tools'
import { Query } from './query'
import { Mutation } from './mutation'
import { ComicBook, ComicBookInput } from './comicBook'
import { Money, MoneyInput } from './money'
import { resolver } from './resolver'

export default makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    ComicBook,
    ComicBookInput,
    Money,
    MoneyInput,
  ],
  resolvers: resolver
})
