import { mutations as comicBookMutations } from './comicBook'

export const Mutation = `
  type Mutation {
    ${comicBookMutations}
  }
`
