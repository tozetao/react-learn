import React, { useState } from 'react'

function User() {
  console.log('render User.')
  const [cnt, setCnt] = useState(1)
  const [, forceUpdate] = useState({})

  return (<>
    <div>
      <button onClick={() => {
        setCnt(cnt - 1)
      }}>-</button>
      <span>{ cnt }</span>
      <button onClick={() => {
        // 依次执行
        const fn = cnt => {
          console.log(cnt)
          return cnt + 1
        }
        setCnt(fn)
        setCnt(fn)
        setCnt(fn)
      }}>+</button>
    </div>
    <div>
      <button onClick={() => {
        forceUpdate({})
      }}>强制刷新</button>
    </div>
  </>)
}

export default function Test() {
  return (
    <div>
      <User />
    </div>
  )
}
