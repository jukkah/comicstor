import { promisify } from 'util'

import fs from '../fs'
import { readFileOr } from './loader'
import { logFile } from '../../config'

const writeFile = promisify(fs.writeFile)

const appendLineToFile = async (line) => {
  try {
    const oldContent = await readFileOr(logFile, { encoding: 'utf8' }, '')
    const newContent = oldContent + line + '\n'
    await writeFile(logFile, newContent, { encoding: 'utf8' })
  } catch (error) {
    console.error(`Cannot append action to permanent log ${logFile}`)
    console.error(error)
    throw error
  }
}

const middleware = store => next => async (action) => {
  let result = next(action)
  // append only successfully executed actions to file
  await appendLineToFile(JSON.stringify(action))
  return result
}

export default middleware
