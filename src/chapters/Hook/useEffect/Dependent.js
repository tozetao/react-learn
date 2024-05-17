import React, { useEffect, useState } from 'react'
import './index.css'

let timer = null;
const boxRef = React.createRef()

const clear = function() {
  console.log('clear action.')
  clearInterval(timer);
}

function MoveableDiv(props) {
  console.log([props.point.x, props.point.y])

  useEffect(() => {
    let currentTimes = 0;

    const times = 100;
    const xSpeed = props.point.x / times
    const ySpeed = props.point.y / times

    const boxEle = boxRef.current
    const duration = 10000 / times

    timer = setInterval(() => {
      const newLeft = currentTimes * xSpeed
      const newTop = currentTimes * ySpeed
      console.log('current times: %o, %o, %o', currentTimes, newLeft, newTop)
      boxEle.style.left = newLeft + 'px'
      boxEle.style.top = newTop + 'px'

      currentTimes += 1
      if (currentTimes > times) {
        clear()
      }
    }, duration)

    return clear
  }, [Number(props.point.x), Number(props.point.y)])

  return (<div className='box' ref={boxRef}>
    coolor
  </div>)
}

export default function Test() {
  console.log('Test component')
  const [ point, setPoint ] = useState({ x: 100, y: 100 })
  const [ visible, setVisible ] = useState(true)

  const leftInputRef = React.createRef()
  const topInputRef = React.createRef()

  return (
    <div>
      {
        visible && (
          <>
            <div style={{
              marginTop: '100px'
            }}>
              <input ref={leftInputRef} />
              <input ref={topInputRef} />
              <button onClick={() => {
                setPoint({
                  x: leftInputRef.current.value,
                  y: topInputRef.current.value
                })
              }}>确定</button>
            </div>
            <MoveableDiv point={point} />
          </>
        )
      }
      <button onClick={() => {
        setVisible(!visible)
      }}>Show/Hidden</button>
    </div>
  )
}
