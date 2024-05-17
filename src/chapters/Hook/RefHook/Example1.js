import React, { useRef, useState } from 'react'

window.arr = [];

export default function Test() {
  // // 每次都是新建一个Ref对象
  // const inputRef = React.createRef()
  const inputRef = useRef()

  window.arr.push(inputRef)

  const [n, setN] = useState(0)

  return (
    <div>
      <div>
        <input ref={inputRef} type="text" />
      </div>
      <div>
        <button onClick={() => {
          console.log(inputRef.current.value)
        }}>获取Ref</button>
      </div>
      <div>
        <input type="number" value={n} onChange={event => {
          setN(event.target.value)
        }} />
      </div>
    </div>
  )
}
