import React from 'react'
import RouterContext from './RouterContext'

export default function withRouter(Component) {
  function RouterWrapper(props) {
    return <RouterContext.Consumer>
      {value => {
        return <Component {...value} {...props} />
      }}
    </RouterContext.Consumer>
  }

  RouterWrapper.displayName = `withRouter(${Component.displayName || Component.name})`
  return RouterWrapper
}