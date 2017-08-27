// = Server config =============================================================

console.log(`process.env.PORT == ${process.env.PORT}`)
export const port = process.env.PORT || 3000

export const enableGraphiQL = process.env.RAZZLE_ENABLE_GRAPHIQL === 'true'

export const logFile = process.env.RAZZLE_LOG_FILE || 'store.log'

export const dropboxApiKey = process.env.RAZZLE_DROPBOX_API_KEY

// = App config ================================================================
