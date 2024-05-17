/*
TransitionGroup
  该组件的chilren接收多个Transition或CSSTransition，该组件用于根据这些子组件的key值，控制它们的进入和退出状态。

  移除组件：当移除某个子组件时，TransitionGroup会给被移除的子组件设置exit、exit-active。

  新增组件：enter、enter-active

appear prop
*/

import React, { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './tg.css'

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task1' },
    { id: 2, name: 'Task2' }
  ])

  const timeout = 2000

  return (
    <div>
        <TransitionGroup>
          {
            tasks.map(item => {
              return <CSSTransition timeout={timeout} key={item.id}>
                <div>
                  <div>
                    <span>
                      任务: {item.name}
                    </span>
                    <button style={{
                      marginLeft: '10px'
                    }} onClick={() => {
                      setTasks(tasks.filter(task => task.id !== item.id))
                    }}>Remove</button>
                  </div>
                </div>
              </CSSTransition>
            })
          }
      </TransitionGroup>
      <button onClick={() => {
        setTasks([
          ...tasks,
          {
            id: Math.random(),
            name: 'Task' + Math.random() * 10
          }
        ])
      }}>New</button>
    </div>
  )
}
