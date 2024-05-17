import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import 'animate.css'

export default function App() {
  const [visible, setVisible] = useState(true)
  const timeout = 500

  return (
    <div>
      <SwitchTransition>
        <CSSTransition
          in={visible} timeout={timeout} key={ visible ? 'first' : 'second'}
          classNames={{
            exit: 'animate__fadeOut',
            enter: 'animate__fadeIn',
          }}
        >
          <h3 className='animate__animated'>{ visible ? 'Hello' : 'World'}</h3>
        </CSSTransition>
      </SwitchTransition>
      <button onClick={() => {
        setVisible(!visible)
      }}>Click</button>
    </div>
  )
}
// 17.26-