import React, { useEffect, useState } from 'react'
import './index.css'

let timer = null;
const boxRef = React.createRef()

const clear = function() {
  console.log('clear action.')
  clearInterval(timer);
}

function MoveableDiv(props) {
  useEffect(() => {
    let currentTimes = 0;

    const times = 100;
    const xSpeed = props.point.x / times
    const ySpeed = props.point.y / times

    const boxEle = boxRef.current
    const duration = 5000 / times
    
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
  })

  return (<div className='box' ref={boxRef}>
    coolor
  </div>)
}

export default function Test() {
  console.log('Test component')
  const [ point, setPoint ] = useState({ x: 100, y: 100 })
  const [ visible, setVisible ] = useState(true)

  return (
    <div>
      {
        visible && (
          <>
            <div style={{
              marginTop: '100px'
            }}>
              <input value={point.x} onChange={event => {
                setPoint({
                  ...point,
                  x: event.target.value
                })
              }} />
              <input value={point.y} onChange={event => {
                setPoint({
                  ...point,
                  y: event.target.value
                })
              }} />
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
