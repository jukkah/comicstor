import _ from 'lodash'

import { getStore } from '../store'
import { createComicBook, updateComicBook } from '../store/comicBooks'

export const resolver = {
  Query: {
    // currencyCodes(): [String!]!
    async currencyCodes() {
      const store = await getStore()
      return _.uniq(
        _.flatMap(store.getState().get('comicBooks').toJS(), (comicBook) => [
          comicBook.originalPrice.code,
          comicBook.purchasePrice.code,
        ]),
      )
    },
    // comicBooks(): [ComicBook!]!
    async comicBooks() {
      const store = await getStore()
      return store.getState().get('comicBooks').toJS();
    },
    // tags(): [String!]!
    async tags() {
      const store = await getStore()
      return _.uniq(
        _.flatMap(store.getState().get('comicBooks').toJS(), (comicBook) => comicBook.tags)
      )
    },
  },
  Mutation: {
    // addComicBook(input: ComicBookInput!): ComicBook
    async addComicBook(root, { input }) {
      const store = await getStore()
      const comicBook = { ...input }
      await store.dispatch(createComicBook(comicBook))
      return findById(comicBook.id)
    },

    // updateComicBook(input: ComicBookInput!): ComicBook
    async updateComicBook(root, { input }) {
      const store = await getStore()
      const comicBook = { ...input }
      await store.dispatch(updateComicBook(comicBook))
      return findById(comicBook.id)
    }
  }
}

async function findById(id) {
  const store = await getStore()
  const comicBooks = store.getState().get('comicBooks')
  const comicBook = comicBooks.find(comicBook => comicBook.get('id') === id)
  return comicBook ? comicBook.toJS() : null
}
