import { CREATE_COMIC_BOOK, UPDATE_COMIC_BOOK } from './actionTypes'

const version = 1

export function createComicBook(comicBook) {
  return { type: CREATE_COMIC_BOOK, version, comicBook }
}

export function updateComicBook(comicBook) {
  return { type: UPDATE_COMIC_BOOK, version, comicBook }
}
