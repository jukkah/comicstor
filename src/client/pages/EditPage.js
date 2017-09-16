import React from 'react'
import { connect } from 'react-redux'
import { ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

class EditPage extends React.PureComponent {
  handleBack = () => {
   this.props.history.goBack()
  };

  handleEdit = () => {
    this.props.history.push(`/${this.props.id}/edit`)
  }

  handleRemove = () => {
    console.log(`remove ${this.props.id}`)
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.renderTitle()}
          iconElementLeft={<IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>}
          onLeftIconButtonTouchTap={this.handleBack}
          iconElementRight={<IconButton><FontIcon className="material-icons">delete</FontIcon></IconButton>}
          onRightIconButtonTouchTap={this.handleRemove}
        />
        {this.renderDetails()}
        <FloatingActionButton onClick={this.handleEdit} style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          margin: '2em',
        }}>
          <FontIcon className="material-icons">edit</FontIcon>
        </FloatingActionButton>
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
      <div>
        {this.renderName()}
        {this.renderNumber()}
        {this.renderPublished()}
        {this.renderOriginalPrice()}
        {this.renderPurchasePrice()}
        {this.renderCondition()}
        {this.renderTags()}
      </div>
    )
  }

  renderName() {
    return (
      <TextField
        name="name"
        fullWidth
        floatingLabelText="Nimi"
        defaultValue={this.props.name}
      />
    )
  }

  renderNumber() {
    return (
      <TextField
        name="number"
        fullWidth
        floatingLabelText="Numero"
        defaultValue={this.props.number}
      />
    )
  }

  renderPublished() {
    return (
      <TextField
        name="published"
        fullWidth
        floatingLabelText="Julkaisupäivä"
        defaultValue={moment(this.props.published).format('D.M.YYYY')}
      />
    )
  }

  renderOriginalPrice() {
    const originalPrice = this.props.originalPrice || {}
    const value = numeral(originalPrice.value).format('0,0.00')
    const code = originalPrice.code

    return (
      <TextField
        name="originalPrice"
        fullWidth
        floatingLabelText="Irtonumeron hinta"
        defaultValue={`${value} ${code}`}

      />
    )
  }

  renderPurchasePrice() {
    const purchasePrice = this.props.purchasePrice || {}
    const value = numeral(purchasePrice.value).format('0,0.00')
    const code = purchasePrice.code

    return (
      <TextField
        name="purchasePrice"
        fullWidth
        floatingLabelText="Ostohinta"
        defaultValue={`${value} ${code}`}

      />
    )
  }

  renderCondition() {
    return (
      <TextField
        name="condition"
        fullWidth
        floatingLabelText="Kunto"
        defaultValue={this.props.condition}
      />
    )
  }

  renderTags() {
    if (this.props.tags.length || this.props.removed) {
      const chips = [
        ...this.props.tags.map(this.renderTag),
        ...(this.props.removed ? this.renderTag('Poistettu') : []),
      ]

      return (
        <ListItem
          leftIcon={<FontIcon className="fa fa-tags" />}
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

export default withRouter(connect(mapStateToProps)(EditPage))
