import { queries as comicBookQueries } from './comicBook'
import { queries as moneyQueries } from './money'

export const Query = `
  type Query {
    ${comicBookQueries}
    ${moneyQueries}
  }
`
