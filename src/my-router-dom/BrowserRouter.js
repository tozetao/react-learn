import React, { Component } from 'react'
import Router from '../my-router/Router'
import createBrowserHistory from './history/createBrowserHistory'

export default class BrowserRouter extends Component {

  history = createBrowserHistory(this.props)

  render() {
    return (
      <Router history={this.history}>
        {this.props.children}
      </Router>
    )
  }
}
