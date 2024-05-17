import React, { useState } from 'react'

function changeReducer(state, type) {
  switch (type) {
    case 'incr':
      state = state + 1;
      break;
    case 'decr':
      state = state - 1;
      break;
    default:
      break;
  }
  return state
}

// 官方提供了一个useReducer
function useReducer(reducer, initState) {
  const [state, setState] = useState(initState)

  function dispatch(action) {
    const newState = reducer(state, action)
    setState(newState)
  }

  return [state, dispatch]
}

export default function Test() {
  const [count, dispatch] = useReducer(changeReducer, 0)

  return (<>
  <div>
    <button onClick={() => {
      dispatch('decr')
    }}>-</button>
    { count }
    <button onClick={() => {
      dispatch('incr')
    }}>+</button>
  </div>
  </>)
}
