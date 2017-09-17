import React from 'react'
import { gql, graphql } from 'react-apollo'

const comicBookQuery = gql`
  query comicBook($id: ID!) {
    comicBook(id: $id) {
      id
      name
      number
      published
      coverPhoto
      originalPrice { value code }
      purchasePrice { value code }
      condition
      removed
      tags
    }
  }
`

const updateComicBookMutation = gql`
  mutation updateComicBook($id: ID!) {
    updateComicBook(id: $id) {
        id
        name
        number
        published
        coverPhoto
        originalPrice { value code }
        purchasePrice { value code }
        condition
        removed
        tags
    }
  }
`

const options = {
  options: (props) => ({ variables: { id: props.match.params.id } })
}

@graphql(comicBookQuery, options)
@graphql(updateComicBookMutation, options)
export default class ItemPage extends React.PureComponent {
  render() {
    return (
      <div>ItemPage</div>
    )
  }
}
