import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import { withRouter } from 'react-router-dom'

import App from './App'
import ItemPage from './ItemPage'
import NotFound from './NotFound'

class Main extends React.PureComponent {
  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/:id" component={ItemPage} />
            <Route component={NotFound} />
          </Switch>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default withRouter(Main)
