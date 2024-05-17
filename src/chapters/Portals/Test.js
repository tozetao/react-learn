import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css'

// ReactDOM.createPortal()
// 指定要挂在的节点，即可以把要渲染的内容渲染到指定的节点下面。
function CompA() {
  const dom = document.querySelector('div.modal')
  return ReactDOM.createPortal(<div>
    <h3>Comp A</h3>
    <CompB />
  </div>, dom)
}

function CompB() {
  return <div>
    <h3>Comp B</h3>
  </div>
}

export default class Test extends Component {
  render() {
    // React对事件进行了包装，它的事件冒泡是根据虚拟DOM树来冒泡的。
    // 在这里CompA组件使用Portal渲染到了div.modal真是DOM节点，但是由CompA、CompB组件冒泡的点击事件，Test组件也都会触发。
    return (
      <>
        <div className='app' onClick={e => {
          console.log('triger on app component, ', e.target)
        }}>
          <h3>App Div</h3>
          <CompA />
        </div>
      </>
    )
  }
}