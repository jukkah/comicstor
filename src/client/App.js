import React from 'react'
import { connect } from 'react-redux'

class App extends React.PureComponent {
  render() {
    return (
      <ul>
        {this.renderComicBooks()}
      </ul>
    )
  }

  renderComicBooks() {
    return this.props.comicBooks.map(comicBook => (
      <li key={comicBook.id}>
        ID: {comicBook.id}
      </li>
    ))
  }
}

const mapStateToProps = state => ({
  comicBooks: state.get('comicBooks').toJS(),
})

export default connect(mapStateToProps)(App)
