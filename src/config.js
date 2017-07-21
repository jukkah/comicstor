// = Server config =============================================================

export const port = process.env.PORT || 3000

export const enableGraphiQL = process.env.ENABLE_GRAPHIQL === 'true'

export const logFile = process.env.LOG_FILE || '/store.log'

export const enableLogFileExport = process.env.ENABLE_LOG_FILE_EXPORT === 'true'

export const enableLogFileImport = process.env.ENABLE_LOG_FILE_IMPORT === 'true'

export const dropboxApiKey = process.env.DROPBOX_API_KEY

// = App config ================================================================
