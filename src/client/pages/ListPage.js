import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Subheader from 'material-ui/Subheader'
import Link from '../components/Link'
import moment from 'moment'

class ListPage extends React.PureComponent {
  render() {
    return (
      <div>
        {this.renderAppBar()}
        <List>
          {this.renderComicBooks()}
        </List>
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

  renderComicBooks() {
    let comicBooks = this.props.comicBooks.sortBy(
      comicBook => comicBook.get('published')
    )

    let lastYear

    return comicBooks.flatMap(comicBook => {
      const year = moment(comicBook.get('published')).format('YYYY')
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
    const published = moment(comicBook.get('published')).format('D.M.YYYY')
    return `${name} #${number} - ${published}`
  }
}

const mapStateToProps = state => ({
  comicBooks: state.get('comicBooks'),
})

export default connect(mapStateToProps)(ListPage)
