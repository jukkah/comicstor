import { promisify } from 'util'
import { fromJS } from 'immutable'

import fs from '../fs'
import { logFile } from '../../config'
import { reducer, emptyState } from './reducer'
import migrateActions from './migrations'

const readFile = promisify(fs.readFile)

export const readFileOr = async (path, options, defaultContent) => {
  try {
    return await readFile(path, options)
  } catch (error) {
    if (error.status === 409 && error.error.indexOf('not_found') !== -1) {
      return defaultContent
    }
    throw error
  }
}

const readLinesFromFile = async () => {
  const content = await readFileOr(logFile, { encoding: 'utf8' }, '')
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
