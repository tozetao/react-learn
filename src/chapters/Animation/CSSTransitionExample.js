/*
CSSTransition

进入时:
1. 为CSSTransition内部的root元素添加enter样式
2. 当enter样式完全生效时（在下一帧，回流、重绘?），立即为root元素添加enter-active样式。
3. timeout结束后，去掉之前的样式，添加enter-done样式

退出时:
1. 为CSSTransition内部的root元素添加exit样式
2. 当enter样式完全生效时（在下一帧，回流、重绘?），立即为root元素添加exit-active样式。
3. timeout结束后，去掉之前的样式，添加exit-done样式

classNames
  用于指定state状态变化时的样式名称。

appear

*/

import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.css'

const timeout = 1000

function Title1({ visible }) {
  return (
    <CSSTransition in={visible} timeout={timeout} mountOnEnter appear>
      <h3 className='title'>Title1</h3>
    </CSSTransition>
  )
}

function Title2({ visible }) {
  return (
    <CSSTransition in={visible} timeout={timeout} mountOnEnter>
      <h3 className='title'>Title2</h3>
    </CSSTransition>
  )
}

export default function App() {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <div className='container'>
        <Title1 visible={ visible } />
        <Title2 visible={ !visible } />
      </div>
      <button className='demo' type="button" onClick={() => setVisible(!visible)}>
        toggle
      </button>
    </div>
  )
}
