import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import persister from './persister'
import loadState from './loader'

const store = createStore(reducer, loadState(), applyMiddleware(persister))
export default store
