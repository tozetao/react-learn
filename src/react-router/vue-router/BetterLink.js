import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import routeConfig from './routes'

function getPath(routeArr, routeName) {
  const path = _getPath(routeArr, routeName, '/')
  if (!path) {
    throw new Error('Unable to find the path for the route.')
  }
  return path
}

function _getPath(routeArr, routeName, basePath) {
  for (const { name, children, path } of routeArr) {
    let newPath = basePath + '/' + path
    newPath = newPath.replace(/\/+/, '/')

    if (routeName === name) {
      return newPath  
    }

    if (Array.isArray(children)) {
      const result = _getPath(children, routeName, newPath)
      if (result) {
        return result
      }
    }
  }
  return null
}

/**
 * 
 * @param {
 *  to: {
 *    search: '?sort-name',
 *    name: 'user'
 *  },
 *  ...
 * } props 
 * @returns 
 */
export default function BetterLink(props) {
  const { to, ...rest } = props
  
  const newTo = {
    pathname: '',
    search: ''
  }

  if (typeof to !== 'string' && to.name) {
    newTo.pathname = getPath(routeConfig, to.name)
  } else {
    newTo.pathname = to
  }
  console.log(newTo)

  return (
    <Link to={newTo} {...rest}>
      {props.children}
    </Link>
  )
}
