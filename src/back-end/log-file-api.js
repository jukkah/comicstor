import express from 'express'
import bodyParser from 'body-parser'

import { writeFile, readFile } from './fs'
import { logFile, enableLogFileExport, enableLogFileImport } from '../config'
import { reloadStore } from './store'

export default function logFileApi() {
  const router = express.Router()
  router.use(bodyParser.text({ type: 'text/plain' }))

  if (enableLogFileExport) {
    router.get(`/${logFile}`, async (req, res) => {
      try {
        const content = await readFile(logFile)
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
        await writeFile(logFile, req.body)
        reloadStore()
        res.status(200).send()
      } catch (err) {
        res.status(500).send()
      }
    })
  }

  return router
}
