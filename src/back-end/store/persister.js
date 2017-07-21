import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import { logFile } from '../../config'

const appendFile = promisify(fs.appendFile)

const appendLineToFile = async (line) => {
  const filePath = path.resolve(process.cwd(), logFile)
  try {
    appendFile(filePath, line + '\n', { encoding: 'utf8' })
  } catch (error) {
    console.error(`Cannot append action to permanent log ${filePath}`)
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
