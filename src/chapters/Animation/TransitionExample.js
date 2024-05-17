import React from 'react'
import { Transition } from 'react-transition-group';
import { useRef, useState } from 'react';

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

// Transition组件

// in属性用于state参数值，值为false时，state默认值为exited；值为true时，state默认值为entered

// state的状态变化
// in: false => true
// exited => entering =>(timeout) entered

// in: true => false
// entered => exiting =>(timeout) exited

// timeout属性用于表示从中间状态切换到最终状态的时间。

// mountOnEnter: 
// 当in属性第一次为true时才挂载回调函数的内容，可以将该属性设置为true。
// 之后除非你设置了unmountOnExit，否则即时组件的state为exited，组件都会保持挂载状态。

// appear
// 在第一次挂载时，默认子组件是不会执行enter渐变的。如果想要这种行为，将in和appear的值都设为true。

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

function Fade({ in: inProp }) {
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
      {state => (
        <div ref={nodeRef} style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          I'm a fade Transition!
        </div>
      )}
    </Transition>
  );
}

export default function App() {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div>
      <Transition nodeRef={nodeRef} in={inProp} timeout={500} mountOnEnter unmountOnExit>
        {state => {
          console.log(state)
          return (
            <div ref={nodeRef} style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              I'm a fade Transition!
            </div>
          )
        }}
      </Transition>
      <button onClick={() => setInProp(!inProp)}>
        Click
      </button>
    </div>
  );
}