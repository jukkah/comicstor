import _ from 'lodash'

import { store } from '../store'
import { createComicBook, updateComicBook } from '../store/comicBooks'

export const resolver = {
  Query: {
    // currencyCodes(): [String!]!
    currencyCodes() {
      return _.uniq(
        _.flatMap(store.getState().get('comicBooks').toJS(), (comicBook) => [
          comicBook.originalPrice.code,
          comicBook.purchasePrice.code,
        ]),
      )
    },
    // comicBooks(): [ComicBook!]!
    comicBooks() {
      return store.getState().get('comicBooks').toJS();
    },
    // tags(): [String!]!
    tags() {
      return _.uniq(
        _.flatMap(store.getState().get('comicBooks').toJS(), (comicBook) => comicBook.tags)
      )
    },
  },
  Mutation: {
    // addComicBook(input: ComicBookInput!): ComicBook
    addComicBook(root, { input }) {
      const comicBook = { ...input }
      store.dispatch(createComicBook(comicBook))
      return findById(comicBook.id)
    },

    // updateComicBook(input: ComicBookInput!): ComicBook
    updateComicBook(root, { input }) {
      const comicBook = { ...input }
      store.dispatch(updateComicBook(comicBook))
      return findById(comicBook.id)
    }
  }
}

function findById(id) {
  const comicBooks = store.getState().get('comicBooks')
  const comicBook = comicBooks.find(comicBook => comicBook.get('id') === id)
  return comicBook ? comicBook.toJS() : null
}
