import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

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
        {this.renderDetails()}
      </div>
    )
  }

  renderTitle() {
    const name = this.props.name
    const number = this.props.number
    const year = moment(this.props.published).format('YYYY')
    return `#${number}/${year} ${name}`
  }

  renderDetails() {
    return (
      <List>
        {this.renderName()}
        {this.renderNumber()}
        {this.renderPublished()}
        {this.renderOriginalPrice()}
        {this.renderPurchasePrice()}
        {this.renderCondition()}
        {this.renderTags()}
      </List>
    )
  }

  renderName() {
    if (this.props.name) {
      return (
        <ListItem
          primaryText={this.props.name}
          secondaryText="Nimi"
        />
      )
    }
  }

  renderNumber() {
    if (this.props.number) {
      return (
        <ListItem
          primaryText={this.props.number}
          secondaryText="Numero"
        />
      )
    }
  }

  renderPublished() {
    if (this.props.published) {
      return (
        <ListItem
          primaryText={moment(this.props.published).format('D.M.YYYY')}
          secondaryText="Julkaisupäivä"
        />
      )
    }
  }

  renderOriginalPrice() {
    if (this.props.originalPrice) {
      const value = numeral(this.props.originalPrice.value).format('0,0.00')
      const code = this.props.originalPrice.code
      return (
        <ListItem
          primaryText={`${value} ${code}`}
          secondaryText="Irtonumeron hinta"
        />
      )
    }
  }

  renderPurchasePrice() {
    if (this.props.purchasePrice) {
      const value = numeral(this.props.purchasePrice.value).format('0,0.00')
      const code = this.props.purchasePrice.code
      return (
        <ListItem
          primaryText={`${value} ${code}`}
          secondaryText="Ostohinta"
        />
      )
    }
  }

  renderCondition() {
    if (this.props.condition) {
      return (
        <ListItem
          primaryText={`${this.props.condition}/10`}
          secondaryText="Kunto"
        />
      )
    }
  }

  renderTags() {
    if (this.props.tags.length || this.props.removed) {
      const chips = [
        ...this.props.tags.map(this.renderTag),
        ... (this.props.removed ? this.renderTag('Poistettu') : []),
      ]

      return (
        <ListItem
          primaryText={
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {chips}
            </div>
          }
        />
      )
    }
  }

  renderTag(tag) {
    return (
      <Chip key={tag} style={{ margin: 4 }}>
        <Avatar size={32}>{tag.charAt(0).toUpperCase()}</Avatar>
        {tag}
      </Chip>
    )
  }
}

const mapStateToProps = (state, props) => {
  const result = state.get('comicBooks').find((comicBook) => {
    return comicBook.get('id') === props.match.params.id
  })

  return result ? result.toJS() : {}
}

export default withRouter(connect(mapStateToProps)(ItemPage))
