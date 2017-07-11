import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import comicBooks from './comicBooks'

export const reducer = combineReducers({
  comicBooks,
})

export const emptyState = fromJS({
  comicBooks: undefined,
})
