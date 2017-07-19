import fs from 'fs'
import path from 'path'
import { fromJS } from 'immutable'
import { logFile } from '../../config'
import { reducer, emptyState } from './reducer'
import migrateActions from './migrations'

function readFileOr(path, options, defaultContent) {
  try {
    return fs.readFileSync(path, options)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultContent
    }
    throw error
  }
}

function readLinesFromFile() {
  const filePath = path.resolve(process.cwd(), logFile)
  const content = readFileOr(filePath, { encoding: 'utf8' }, '')
  return content.split('\n').filter(line => line !== '')
}

const loadState = () => {
  const filePath = path.resolve(process.cwd(), logFile)
  try {
    const actions = readLinesFromFile().map(line => JSON.parse(line))
    const migratedActions = migrateActions(actions)
    return migratedActions.reduce(reducer, emptyState)
  } catch (cause) {
    console.error(`Cannot load action log from file ${filePath}`)
    throw cause
  }
}

export default loadState
