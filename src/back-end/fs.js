import dropboxFs from 'dropbox-fs'

import { dropboxApiKey } from '../config'

const dfs = dropboxFs({
    apiKey: dropboxApiKey,
})

export default dfs
