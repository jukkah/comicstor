import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <AppBar />
        <List>
          {this.renderComicBooks()}
        </List>
      </div>
    )
  }

  renderComicBooks() {
    let comicBooks = this.props.comicBooks.sortBy(
      comicBook => comicBook.get('published')
    )

    let lastYear

    return comicBooks.flatMap(comicBook => {
      const year = comicBook.get('published').substr(0, 4)
      const headerNeeded = year !== lastYear
      lastYear = year

      return [
        this.renderHeader(year, headerNeeded),
        <ListItem
          key={comicBook.get('id')}
          primaryText={this.renderMainInfo(comicBook)}
        />,
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
    const published = comicBook.get('published')
    return `${name} #${number} - ${published}`
  }
}

const mapStateToProps = state => ({
  comicBooks: state.get('comicBooks'),
})

export default connect(mapStateToProps)(App)
