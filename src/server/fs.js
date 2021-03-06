import dropboxFs from 'dropbox-fs'
import fs from 'fs'
import { promisify } from 'util'

import { dropboxApiKey } from '../config'

export const readFile = (...options) => {
  return dropboxApiKey ? dropboxReadFile(...options) : fsReadFile(...options)
}

export const writeFile = (...options) => {
  return dropboxApiKey ? dropboxWriteFile(...options) : fsWriteFile(...options)
}

const dfs = (dropboxApiKey) => {
  return dropboxFs({
    apiKey: dropboxApiKey,
  })
}

const dropboxReadFile = (path) => {
  const readFile = promisify(dfs(dropboxApiKey).readFile)
  return readFile(`/${path}`, { encoding: 'utf8' }).catch((error) => {
    if (error.status === 409 && error.error.indexOf('not_found') !== -1) {
      error.code = 'ENOENT'
    }
    throw error
  })
}

const dropboxWriteFile = (path, content) => {
  const writeFile = promisify(dfs(dropboxApiKey).writeFile)
  return writeFile(`/${path}`, content, { encoding: 'utf8' })
}

const fsReadFile = (path) => {
  const readFile = promisify(fs.readFile)
  return readFile(path, { encoding: 'utf8' })
}

const fsWriteFile = (path, content) => {
  const writeFile = promisify(fs.writeFile)
  return writeFile(path, content, { encoding: 'utf8' })
}
