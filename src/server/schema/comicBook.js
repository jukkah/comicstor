export const ComicBook = `
  type ComicBook {
    id: ID!
    name: String
    number: String
    published: String
    coverPhoto: String
    originalPrice: Money
    purchasePrice: Money
    condition: Float
    removed: Boolean!
    tags: [String!]!
  }
`

export const ComicBookInput = `
  input ComicBookInput {
    id: ID!
    name: String
    number: String
    published: String
    coverPhoto: String
    originalPrice: MoneyInput
    purchasePrice: MoneyInput
    condition: Float
    removed: Boolean
    tags: [String!]
  }
`

export const queries = `
  comicBooks: [ComicBook!]!
  tags: [String!]!
`

export const mutations = `
  addComicBook(input: ComicBookInput!): ComicBook
  updateComicBook(input: ComicBookInput!): ComicBook
`
