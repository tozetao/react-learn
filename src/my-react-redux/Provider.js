import React from 'react'

import ctx from './ctx';

export default function Provider(props) {
  return (
    <ctx.Provider value={props.value}>
      { props.children }
    </ctx.Provider>
  )
}
