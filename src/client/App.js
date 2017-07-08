import React from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'

class App extends React.PureComponent {
  render() {
    return (
      <List>
        {this.renderComicBooks()}
      </List>
    )
  }

  renderComicBooks() {
    return this.props.comicBooks.map(comicBook => (
      <ListItem
        key={comicBook.get('id')}
        primaryText={comicBook.get('id')}
      />
    ))
  }
}

const mapStateToProps = state => ({
  comicBooks: state.get('comicBooks'),
})

export default connect(mapStateToProps)(App)
