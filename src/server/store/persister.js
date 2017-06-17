import fs from 'fs'
import path from 'path'
import { logFile } from '../../config'

function appendLineToFile(line) {
  const filePath = path.resolve(process.cwd(), logFile)
  try {
    fs.appendFileSync(filePath, line + '\n', { encoding: 'utf8' })
  } catch (error) {
    console.error(`Cannot append action to permanent log ${filePath}`)
    console.error(error)
    throw error
  }
}

const middleware = store => next => action => {
  let result = next(action)
  // append only successfully executed actions to file
  appendLineToFile(JSON.stringify(action))
  return result
}

export default middleware
