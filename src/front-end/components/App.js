import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'

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
