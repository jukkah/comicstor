import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ComicBookList from '../components/ComicBookList'

class ListPage extends React.PureComponent {
  render() {
    return (
      <div>
        {this.renderAppBar()}
        <ComicBookList comicBooks={this.props.comicBooks} />
      </div>
    )
  }

  renderAppBar() {
    return (
      <AppBar
        // iconElementRight={<IconButton><ActionSearch /></IconButton>}

        iconElementLeft={<IconButton><ActionSearch /></IconButton>}
        title={this.renderSearchBar()}
        iconElementRight={<IconButton><NavigationClose /></IconButton>}
      />
    )
  }

  renderSearchBar() {
    return (
      <TextField
        fullWidth
        hintText="Hae..."
        hintStyle={{ color: 'white' }}
        underlineFocusStyle={{ borderColor: 'white' }}
      />
    )
  }
}

const mapStateToProps = state => ({
  comicBooks: state.get('comicBooks'),
})

export default connect(mapStateToProps)(ListPage)
