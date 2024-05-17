import React, { Component } from 'react'
import { pathMatch } from './pathMatch'
import PropTypes from 'prop-types'

import RouterContext from './RouterContext'

// 提供上下文，包含路由需要的相关数据。
export default class Router extends Component {
  unListen;

  // history: 不同运行环境下的history。
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node
  }

  state = {
    location: this.props.history.location
  }

  componentDidMount() {
    this.unListen = this.props.history.listen((location) => {
      this.setState({
        location
      })
    })
  }

  componentWillUnmount() {
    this.unListen()
  }

  render() {
    const history = this.props.history
    const location = this.state.location
    const match = pathMatch('/', location.pathname)

    // console.log(pathMatch('/users/:id', '/users/10/issus'))

    return (<RouterContext.Provider value={{
      history,
      location,
      match
    }}>
      { this.props.children }
    </RouterContext.Provider>)
  }
}
