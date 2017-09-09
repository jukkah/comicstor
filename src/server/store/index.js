import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import persister from './persister'
import loadState from './loader'

const configureStore = async () => {
  try {
    const store = createStore(reducer, await loadState(), applyMiddleware(persister))
    console.log('✅  Server state loaded successfully')
    return store
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default configureStore()
