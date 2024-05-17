import React, { PureComponent, useMemo, useState } from 'react'

/*
useMemo(fn, deps)
用于保存需要经过复杂计算，但是计算出来的结果不经常发生变化。如果需要保存一些稳定的数据，就可以使用Memo Hook。

fn
  该参数接收一个函数，useMemo会执行该函数并返回fn函数的执行结果。

deps
  依赖项
*/
class Text extends PureComponent {
  render() {
    console.log('Text render')
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

  const handleClick = useMemo(() => {
    return () => {
      const newText = text + String(Math.random() * 100)
      setText(newText)
    }
  }, [text])

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
