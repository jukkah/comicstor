import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import { logFile, enableLogFileExport, enableLogFileImport } from '../config'
import { reloadStore } from './store'

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

export default function logFileApi() {
  const router = express.Router()
  router.use(bodyParser.text({ type: 'text/plain' }))

  if (enableLogFileExport) {
    router.get(`/${logFile}`, async (req, res) => {
      try {
        const filePath = path.resolve(process.cwd(), logFile)
        const content = await readFile(filePath)
        res.append('Content-Type', 'text/plain')
        res.send(content)
      } catch (err) {
        res.status(500).send()
      }
    })
  }

  if (enableLogFileImport) {
    router.put(`/${logFile}`, async (req, res) => {
      try {
        const filePath = path.resolve(process.cwd(), logFile)
        await writeFile(filePath, req.body)
        reloadStore()
        res.status(200).send()
      } catch (err) {
        res.status(500).send()
      }
    })
  }

  return router
}
