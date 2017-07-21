import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import persister from './persister'
import loadState from './loader'

let store
let promise

export const getStore = async () => {
  if (store) return store

  if (!promise) {
    promise = reloadStore()
  }

  await promise
  promise = undefined
  return store
}

export const reloadStore = async () => {
  store = undefined
  const state = await loadState()
  store = createStore(reducer, state, applyMiddleware(persister))
  console.log('Server state loaded successfully')
  return store
}

reloadStore()
