import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { withRouter } from 'react-router-dom'

class ItemPage extends React.PureComponent {
  handleBack = () => {
   this.props.history.goBack()
  };

  render() {
    return (
      <div>
        <AppBar
          title={this.renderTitle()}
          iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
          onLeftIconButtonTouchTap={this.handleBack}
        />
      </div>
    )
  }

  renderTitle() {
    return `${this.props.name} #${this.props.number} - ${this.props.published}`
  }
}

const mapStateToProps = (state, props) => {
  const result = state.get('comicBooks').find((comicBook) => {
    return comicBook.get('id') === props.match.params.id
  })

  return result ? result.toJS() : {}
}

export default withRouter(connect(mapStateToProps)(ItemPage))
