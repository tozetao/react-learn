import React from 'react'

import RouterContext from '../my-router/RouterContext'
import { parsePath } from './history/createBrowserHistory'

export default function Link(props) {
  const { to, ...rest } = props

  if (typeof to !== 'object' && typeof to !== 'string') {
    throw new TypeError('The prop to must be string or object.')
  }

  let location = to
  if (typeof to === 'string') {
    location = parsePath(to)
  }

  return (
    <RouterContext.Consumer>
      {value => {
        const href = value.history.createHref(location)
        return <a {...rest} href={href} onClick={event => {
          event.preventDefault()
          value.history.push(href)
        }}>
          {props.children}
        </a>
      }}
    </RouterContext.Consumer>
  )
}
