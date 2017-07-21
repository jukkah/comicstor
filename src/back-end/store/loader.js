import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { fromJS } from 'immutable'
import { logFile } from '../../config'
import { reducer, emptyState } from './reducer'
import migrateActions from './migrations'

const readFile = promisify(fs.readFile)

const readFileOr = async (path, options, defaultContent) => {
  try {
    return await readFile(path, options)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultContent
    }
    throw error
  }
}

const readLinesFromFile = async () => {
  const filePath = path.resolve(process.cwd(), logFile)
  const content = await readFileOr(filePath, { encoding: 'utf8' }, '')
  return content.split('\n').filter(line => line !== '')
}

const loadState = async () => {
  const filePath = path.resolve(process.cwd(), logFile)
  try {
    const lines = await readLinesFromFile()
    const actions = lines.map(line => JSON.parse(line))
    const migratedActions = migrateActions(actions)
    return migratedActions.reduce(reducer, emptyState)
  } catch (cause) {
    console.error(`Cannot load action log from file ${filePath}`)
    throw cause
  }
}

export default loadState
