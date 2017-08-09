import { fromJS } from 'immutable'

import { readFile } from '../fs'
import { logFile } from '../../config'
import { reducer, emptyState } from './reducer'
import migrateActions from './migrations'

export const readFileOr = async (path, defaultContent) => {
  try {
    return await readFile(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultContent
    }
    throw error
  }
}

const readLinesFromFile = async () => {
  const content = await readFileOr(logFile, '')
  return content.split('\n').filter(line => line !== '')
}

const loadState = async () => {
  try {
    const lines = await readLinesFromFile()
    const actions = lines.map(line => JSON.parse(line))
    const migratedActions = migrateActions(actions)
    return migratedActions.reduce(reducer, emptyState)
  } catch (cause) {
    console.error(`Cannot load action log from file ${logFile}`)
    throw cause
  }
}

export default loadState
