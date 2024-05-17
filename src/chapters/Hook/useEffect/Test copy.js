import React, { useEffect, useState } from 'react'
import './index.css'

function MoveableDiv() {
  // 实现副作用函数仅在组件渲染时运行。
  // 清理函数仅在组件销毁时运行。
  const [, forceUpdate] = useState({})
  
  useEffect(() => {
    console.log('副作用函数')
    return () => {
      console.log('清理函数')
    }
  }, [])
  console.log('运行组件!')

  return (<div>
    <button onClick={() => {
      forceUpdate({})
    }}>刷新</button>
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
