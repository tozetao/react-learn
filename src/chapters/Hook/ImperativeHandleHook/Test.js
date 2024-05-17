import React, { useRef, Component } from 'react'

/*
我们可以通过ref去引用类组件，然后直接调用类组件的方法。但是函数组件是不能这样做的，因此出现了useImperativeHandleHook

useImperativeHandleHook(ref, init, deps)
ref
  即React.Ref对象。
init
  是一个回到函数。用于给ref.current赋值。

*/

class App extends Component {
  call() {
    console.log('why do you call me?')
  }

  render() {
    return (
      <div>
        <h3>This is a App Component</h3>
      </div>
    )
  }
}


export default function Test() {
  const appRef = useRef()

  return (
    <div>
      <App ref={appRef} />
      <button onClick={() => {
        appRef.current.call()
      }}>Call App method</button>
    </div>
  )
}
