import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { push } from './lib/action';

export function Nav(props) {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/counter" style={{
        marginLeft: '10px'
      }}>Counter</Link>

      <button onClick={ () => {
        props.dispatch(push({
          path: '/counter'
        }))
      } }>Manual Link</button>
    </div>
  )
}

function mapDispatchToProps(_dispatch) {
  return {
    dispatch(action) {
      return _dispatch(action)
    }
  }
}

export default connect(mapDispatchToProps)(Nav)