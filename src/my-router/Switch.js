import React, { Component } from 'react'
import { pathMatch } from './pathMatch'
import RouterContext from './RouterContext'

import Route from './Route'

export default class Switch extends Component {
  getMatchRoute = ({ location }) => {
    let children = [];
    if (Array.isArray(this.props.children)) {
      children = this.props.children
    } else if (this.props.children && typeof this.props.children === 'object') {
      children = [this.props.children]
    }

    // class对象的类型判断该怎么做?
    // child必须是Route对象

    // children是React Element对象集合，child是React Element对象，type是Route对象类型。
    for (const child of children) {
      if (child.type !== Route) {
        throw new TypeError('The child must be a Route Object')
      }

      const { path, exact = false, strict = false, sensitive = false } = child.props
      const match = pathMatch(path, location.pathname, {
        exact, strict, sensitive
      })
      if (match) {
        return child
      }
    }

    return null
  }

  render() {
    return (<RouterContext.Consumer>
      {this.getMatchRoute}
    </RouterContext.Consumer>)
  }
}
