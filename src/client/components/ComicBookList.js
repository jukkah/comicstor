import React from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Link from '../components/Link'

export default class ComicBookList extends React.PureComponent {
  render() {
    return (
      <List>
        {this.renderComicBooks()}
      </List>
    )
  }

  renderComicBooks() {
    let comicBooks = this.props.comicBooks.sortBy(
      comicBook => comicBook.get('published')
    )

    let lastYear

    return comicBooks.flatMap(comicBook => {
      const year = moment(comicBook.get('published'), 'YYYY-MM-DD').format('YYYY')
      const headerNeeded = year !== lastYear
      lastYear = year

      const id = comicBook.get('id')

      return [
        this.renderHeader(year, headerNeeded),
        <Link to={`/${id}`} key={id}>
          <ListItem primaryText={this.renderMainInfo(comicBook)} />
        </Link>,
      ]
    })
  }

  renderHeader(year, headerNeeded) {
    if (headerNeeded) {
      return (
        <Subheader key={year}>{year}</Subheader>
      )
    }
  }

  renderMainInfo(comicBook) {
    const name = comicBook.get('name')
    const number = comicBook.get('number')
    const published = moment(comicBook.get('published'), 'YYYY-MM-DD').format('D.M.YYYY')
    return `${name} #${number} - ${published}`
  }
}
