import React, { PureComponent, useCallback, useState } from 'react'

/*
useCallback(fn, deps)
该函数会固定函数的引用，只要依赖项没有发生变化，会始终返回之前函数的地址。如果依赖项发生变化，将会返回一个新的函数地址。

fn: 
  该参数是一个函数。
  useCallbak会将其作为返回值返回。在之后的在之后的渲染中依赖项没有发生变化，
  callback hook会始终返回fn参数之前绑定的函数地址。

desp: 依赖项。

一般使用useCallback()来进行性能优化。

*/
class Text extends PureComponent {
  render() {
    console.log('Text component')
    return <div>
      <p>{ this.props.text }</p>
      <button onClick={() => {
        if (typeof this.props.onClick === 'function') {
          this.props.onClick()
        }
      }}>Click</button>
    </div>
  }
}

function Enter() {
  console.log('Parent Render')
  const [text, setText] = useState(123)
  const [number, setNumber] = useState(0)
  
  // Text是一个继承自PureComponent，我们希望它在props和state没有变化时不发生重新渲染。
  // 但是在下面的代码中无法实现这种效果，因为onClick属性绑定的是一个函数，当Enter组件渲染时，
  // onClick每次绑定的都是一个新的函数，因此PureComponent的性能优化失效了。

  // 这种情况就可以使用useCallback()进行优化。
  const handleClick = useCallback(() => {
    setText(123)
  }, [])

  return (
    <div>
      <Text text={text} onClick={handleClick} />
      <input type="number" value={number} onChange={(event) => {
        setNumber(event.target.value)
      }} />
    </div>
  )
}

export default function Test() {
  return (
    <Enter /> 
  )
}
