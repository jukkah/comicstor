import React from 'react'
import { withRouter } from 'react-router-dom'

class Link extends React.PureComponent {
  render() {
    return React.cloneElement(this.props.children, {
      onClick: () => {
        this.props.history.push(this.props.to)
      }
    })
  }
}

export default withRouter(Link)
