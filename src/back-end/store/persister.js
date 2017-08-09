import { writeFile } from '../fs'
import { readFileOr } from './loader'
import { logFile } from '../../config'

const appendLineToFile = async (line) => {
  try {
    const oldContent = await readFileOr(logFile, '')
    const newContent = oldContent + line + '\n'
    await writeFile(logFile, newContent)
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
