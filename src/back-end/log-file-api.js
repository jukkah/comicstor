import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import { logFile, enableLogFileExport, enableLogFileImport } from '../config'
import { reloadStore } from './store'

export default function logFileApi() {
  const router = express.Router()
  router.use(bodyParser.text({ type: 'text/plain' }))

  if (enableLogFileExport) {
    router.get(`/${logFile}`, (req, res) => {
      const filePath = path.resolve(process.cwd(), logFile)
      res.sendFile(filePath)
    })
  }

  if (enableLogFileImport) {
    router.put(`/${logFile}`, (req, res) => {
      const filePath = path.resolve(process.cwd(), logFile)
      fs.writeFile(filePath, req.body, (err) => {
        if (err) res.status(500).send()
        reloadStore()
        res.status(200).send()
      })
    })
  }

  return router
}
