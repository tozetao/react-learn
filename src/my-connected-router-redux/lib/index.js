import React, { Component } from 'react'

import { Router } from 'react-router-dom'

import { ReactReduxContext } from 'react-redux';

import { changeLocation } from './action';

/**
 * 将Router与Redux连接起来
 */
export class ConnectedRouter extends Component {
  static contextType = ReactReduxContext

  // props
  // history是必须的。

  componentDidMount() {
    this.unListen = this.props.history.listen((location, action) => {  
      const { store } = this.context
      store.dispatch(changeLocation(location, action))
    })
  }

  componentWillUnmount() {
    this.unListen && this.unListen()
  }

  render() {
    return (
      <Router history={this.props.history}>
        {this.props.children}
      </Router>
    )
  }
}

export { default as connectRouter } from './reducer'