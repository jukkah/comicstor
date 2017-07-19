import _ from 'lodash'

const migrateVersion = (version, nextVersion, next) => {
  return (action) => {
    if (action.version === version) {
      return {
        ...next(action),
        version: nextVersion,
      }
    }

    return action
  }
}

const from0to1 = (action) => {
  const tags = _.get(action, 'comicBook.tags', [])

  if (_.includes(tags, 'Aku Ankka')) {
    return {
      ...action,
      comicBook: {
        ...action.comicBook,
        name: 'Aku Ankka',
        tags: _.without(action.comicBook.tags, 'Aku Ankka'),
      },
    }
  }

  if (_.includes(tags, 'Aku Ankka Extra')) {
    return {
      ...action,
      comicBook: {
        ...action.comicBook,
        name: 'Aku Ankka Extra',
        tags: _.without(action.comicBook.tags, 'Aku Ankka Extra'),
      },
    }
  }

  if (_.includes(tags, 'Aku Ankka Joulumanteli')) {
    return {
      ...action,
      comicBook: {
        ...action.comicBook,
        name: 'Aku Ankka Joulumanteli',
        tags: _.without(action.comicBook.tags, 'Aku Ankka Joulumanteli'),
      },
    }
  }

  return action
}

const migrations = [
  migrateVersion(undefined, 1, from0to1)
]

export default function migrateActions(actions) {
  return actions.map(action => {
    return migrations.reduce((action, migration) => {
      return migration(action)
    }, action)
  })
}
