import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/counter" style={{
        marginLeft: '10px'
      }}>Counter</Link>

      <button onClick={ () => {
        props.history.push('/home')
      } }>Manual Link</button>
    </div>
  )
}
