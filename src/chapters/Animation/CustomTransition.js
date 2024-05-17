import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import './fade.css'

console.log(window.location)

FadeTransition.defaultProps = {
  timeout: 1500
}

function FadeTransition(props) {
  console.log(props)
  return (
    <CSSTransition
      {...props}
      appear
      classNames = 'fade'
      onEnter={node => {
        node.style.transition = `${props.timeout}ms`
      }}
      onEntered={(node, isAppearing) => {
        node.style.transition = ''
        if (props.onEntered) {
          props.onEntered(node, isAppearing)
        }
      }}
      onExit={node => {
        node.style.transition = `${props.timeout}ms`
      }}
      onExited={node => {
        node.style.transition = ''
        if (props.onExited) {
          props.onExited(node)
        }
      }}
    >
      {props.children}
    </CSSTransition>
  )
}

export default function App() {
  const [inProp, setInProp] = useState(true);
  console.log('inProp: %o', inProp)

  return (
    <div>
      <SwitchTransition>
        <FadeTransition in={inProp} timeout={1000} key={inProp}>
          <h3>{ inProp ? 'True' : 'False' }</h3>
        </FadeTransition>
      </SwitchTransition>
      <button onClick={() => {
        setInProp(!inProp)
      }}>Toggle</button>
    </div>
  )
}
