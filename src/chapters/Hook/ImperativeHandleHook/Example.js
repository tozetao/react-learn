import React, { useImperativeHandle, useRef } from 'react'

/*

*/
function App(props, ref) {
  useImperativeHandle(ref, () => {
    // 如果没有依赖项，init()函数在组件每次渲染时都会被调用。
    // 在有了依赖项后，第一次调用时会缓存返回的结果，只有当依赖项发现变化，init()函数才会被调用。
    return () => {
      console.log('call me')
    }
  })

  return (<div>
    <h3 ref={ref}>This is a function component</h3>
  </div>)
}

const AppWrapper = React.forwardRef(App)

export default function Test() {
  const appRef = useRef()

  return (
    <div>
      <AppWrapper ref={appRef} />

      <button onClick={() => {
        console.log(appRef)
        appRef.current()
      }}>Call App method</button>
    </div>
  )
}
