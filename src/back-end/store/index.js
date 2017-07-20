import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import persister from './persister'
import loadState from './loader'

const makeStore = () => {
  const store = createStore(reducer, loadState(), applyMiddleware(persister))
  console.log('Server state loaded successfully')
  return store
}

export let store = makeStore()

export const reloadStore = () => {
  store = makeStore()
}
