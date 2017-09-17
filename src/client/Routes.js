import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import { withRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import ListPage from './pages/ListPage'
import ItemPage from './pages/ItemPage'
import NotFound from './pages/NotFound'

@withRouter
export default class Routes extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/:id" component={ItemPage} />
            <Route component={NotFound} />
          </Switch>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}
