/*
SwithTransition
  该组件用于实现有秩序的内部切换组件，组件本身不实现效果，只提供状态变化后的样式类。

out-in mode
1. 在内部组件的key值改变时，会在子组件的根元素上添加exit, exit-active样式，渲染退出样式。
2. 当timeout设置的间隔到达时，会移除原有的root元素。
3. 重新渲染组件，渲染新的子组件，为子组件的root元素设置enter, enter-active样式。
4. 当timeout间隔时间到达时，会对新渲染的子组件的根元素设置enter-done样式。

in-out mode
  在重新渲染时会执行以下流程：
  1. 为新渲染的dom根元素添加enter、enter-active样式，保留之前的元素。
  2. 当timeout达到后，为新渲染的root元素设置enter-done样式，而之前保留的元素会被设置exit、exit-active样式
  3. 当timeout再次达到时，删除之前保留的元素。

timeout
  决定状态变化的间隔时间。


*/

import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './switch.css'

export default function App() {
  const [visible, setVisible] = useState(true)

  //
  const timeout = 500

  return (
    <div>
      {/* <SwitchTransition mode="in-out"> */}
      <SwitchTransition>
        <CSSTransition in={visible} timeout={timeout} key={ visible ? 'first' : 'second'}>
          <h3>{ visible ? 'Title1' : 'Title2'}</h3>
        </CSSTransition>
      </SwitchTransition>
      <button onClick={() => {
        setVisible(!visible)
      }}>Click</button>
    </div>
  )
}
// 17.26-