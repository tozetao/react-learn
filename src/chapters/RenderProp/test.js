import React from 'react'
import MouseListener from "./MouseListener";
import withMouseListener from "./withMouseListener";
import './style.css'

/*
展示高阶组件的用法
    showPoint、moveDiv组件 用于实现展示的逻辑。
    withMouseListener组件保存了展示组件的数据状态变化。
*/

// 显示鼠标位置
const showPoint = function(props) {
  return <>
    X: {props.x}, Y: {props.y}
  </>
}

const moveDiv = function(props) {
  return <>
    <div className='point' style={{
      left: props.x - 50,
      top: props.y - 50
    }}>
    </div>
  </>
}

const ShowPointComp = withMouseListener(showPoint)
const MoveDivComp = withMouseListener(moveDiv)

export default function test() {
  return (
    <div>
      <MouseListener render={showPoint} />
      <br />
      <MouseListener render={moveDiv} />
      <br />
      <ShowPointComp />
      <br />
      <MoveDivComp />
    </div>
  )
}
