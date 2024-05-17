import React, { Component } from 'react'

import RouterContext from './RouterContext'
import { pathMatch } from './pathMatch'

/**
path: 路由规则。stirng | [string...]
children: 该路由无论是否匹配，children的内容都会被喧嚷。
render: 
component

children, render, component的优先级：
  - 如果存在children prop，render、compoent prop将会被忽略。
  - children不存在，但是render存在，render将会生效
  - component的优先级最低。


  exact
  strict
  sensitive
*/

export default class Route extends Component {
  static defaultProps = {
    path: '/'
  }

  matchRoute(location) {
    const {
      exact = false,
      strict = false,
      sensitive = false
    } = this.props
    
    return pathMatch(this.props.path || '/', location.pathname, {
      exact,
      strict,
      sensitive
    })
  }

  renderChildren(context) {
    const { match } = context
    const children = this.props.children

    if (children !== undefined && children !== null) {
      if (typeof children === 'function') {
        return children(context)
      }
      return children
    }

    // 路由匹配的处理
    if (match) {
      if (typeof this.props.render === 'function') {
        return this.props.render(context)
      }
      // 问题：如何验证一个prop是一个组件对象
      if (this.props.component) {
        const Component = this.props.component
        return <Component {...context} />
      }
    }

    return null;
  }

  render() {
    return (
      <RouterContext.Consumer>
        {value => {
          const ctxValue = {
            history: value.history,
            location: value.location,
            match: this.matchRoute(value.location)
          }

          return <RouterContext.Provider value={ctxValue}>
            { this.renderChildren(ctxValue) }
          </RouterContext.Provider>
        }}
      </RouterContext.Consumer>
    )
  }
}
