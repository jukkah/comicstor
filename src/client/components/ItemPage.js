import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'

class ItemPage extends React.PureComponent {
  render() {
    return (
      <div>
        <AppBar />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const result = state.get('comicBooks').find((comicBook) => {
    return comicBook.get('id') === props.match.params.id
  })

  return result ? result.toJS() : {}
}

export default connect(mapStateToProps)(ItemPage)
