import { List, fromJS } from 'immutable'
import { CREATE_COMIC_BOOK, UPDATE_COMIC_BOOK } from './actionTypes'

function contains(list, id, idKey = 'id') {
  return list.find(item => item.get(idKey) === id)
}

function createComicBook(state, action) {
  if (contains(state, action.comicBook.id)) {
    throw new Error(`${CREATE_COMIC_BOOK} ComicBook with id ${action.comicBook.id} already exists`)
  }

  return state.push(fromJS(action.comicBook))
}

function updateComicBook(state, action) {
  if (!contains(state, action.comicBook.id)) {
    throw new Error(`${UPDATE_COMIC_BOOK} ComicBook with id ${action.comicBook.id} doesn't exist`)
  }

  const index = state.findIndex(cb => cb.get('id') === action.comicBook.id)
  const oldComicBook = state.get(index)
  const newComicBook = oldComicBook.merge(fromJS(action.comicBook))
  return state.set(index, newComicBook)
}

export default function comicBooksReducer(state = List(), action) {
  switch (action.type) {
    case CREATE_COMIC_BOOK:
      return createComicBook(state, action)
    case UPDATE_COMIC_BOOK:
      return updateComicBook(state, action)
    default:
      return state
  }
}
