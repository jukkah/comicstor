import { CREATE_COMIC_BOOK, UPDATE_COMIC_BOOK } from './actionTypes'

export function createComicBook(comicBook) {
  return { type: CREATE_COMIC_BOOK, comicBook }
}

export function updateComicBook(comicBook) {
  return { type: UPDATE_COMIC_BOOK, comicBook }
}
