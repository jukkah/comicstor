import React from 'react'
import { gql, graphql } from 'react-apollo'

const comicBooksQuery = gql`
  query comicBooks {
    comicBooks {
      id
      name
      number
      published
    }
  }
`

@graphql(comicBooksQuery)
export default class ListPage extends React.PureComponent {
  render() {
    return (
      <div>ListPage</div>
    )
  }
}
