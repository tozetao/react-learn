import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

/*
dom.innerHTML = ''
dom.style.xx = 'xx'
在dom修改页面时，页面会随之改变。

在这个过程中，浏览器不会立即渲染。它是等待浏览器下一次渲染的时间点到达。
浏览器是每隔一段时间进行渲染，这个间隔很短，用户感知不到。

在渲染时，会使用当前dom与上一次渲染的dom进行对比。如果俩个dom树不一致，则重新渲染。

useEffect的执行时机:
  当组件渲染完成且浏览器也渲染完成，useEffect做的变动会在浏览器的下一次渲染时进行绘制。

  这个渲染时机比较慢，所以当你在effect中操作真实dom元素，你会看到页面闪烁一下。
  因为之前页面的内容被快速的覆盖了。

useLayoutEffect
  该Hook与useEffect hook相同，除了执行时机不同。
  执行时机：完成了dom改动，但是还没有呈现给用户，它的执行时机和类组件的componentDidMount、componentDidUpdate相同。


*/
export default function Test() {
  const [n, setN] = useState(0)

  const h3Ref = useRef()
  // useEffect(() => {
  //   h3Ref.current.innerHTML = Math.random().toFixed(2)
  // }, [])

  useLayoutEffect(() => {
    h3Ref.current.innerHTML = Math.random().toFixed(2)
  }, [])

  return (
    <div>
      <h3 ref={h3Ref}>{n}</h3>
      <h4>{n}</h4>

      <button onClick={() => {
        setN(n + 1)
      }}>Incr</button>
    </div>
  )
}
