import React, { useEffect, useState } from 'react'
import './index.css'

// 示例：useEffect副作用函数，因为闭包会绑定运行时上下文的变量。
function MoveableDiv() {
  const [cnt, setCnt] = useState(0)

  // useEffect每次执行时，闭包函数都会绑定其运行的上下文变量（最新的值）。
  useEffect(() => {
    setTimeout(() => {
      console.log(cnt)
    }, 3000)
  })

  // 因为依赖项不变，useEffect只会运行一次，闭包函数最开始绑定的cnt是0，所有永远输出0
  useEffect(() => {
    setInterval(() => {
      console.log(cnt)
    }, 2000)
  }, [])

  return (<div>
    <h3>{ cnt }</h3>
    <button onClick={() => {
      setCnt(cnt + 1)
    }}>Click</button>
  </div>)
}

export default function Test() {
  console.log('Test component')
  const [ point, _setPoint ] = useState({ x: 100, y: 100 })
  const [ visible, setVisible ] = useState(true)

  return (
    <div>
      {
        visible && (
          <MoveableDiv point={point} />
        )
      }
      <button onClick={() => {
        setVisible(!visible)
      }}>Show/Hidden</button>
    </div>
  )
}
