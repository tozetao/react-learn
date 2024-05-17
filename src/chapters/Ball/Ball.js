import React, { Component } from 'react'
import './ball.css'

export default class Ball extends Component {
  constructor(props) {
    super(props)

    // left, top, xSpeed, ySpeed, bg, 
    this.state = {
      left: props.left || 0,
      top: props.top || 0,
      xSpeed: props.xSpeed || 300,
      ySpeed: props.ySpeed || 300,
      bg: props.bg || '#fc4'
    }

    const duration = 16
    setInterval(() => {
      let newLeft = this.state.left + (this.state.xSpeed * duration / 1000)
      let newTop = this.state.top + (this.state.ySpeed * duration / 1000)

      let xSpeed = this.state.xSpeed
      let ySpeed = this.state.ySpeed

      if (newLeft <= 0) {
        newLeft = 0
        xSpeed *= -1
      } else if (newLeft >= document.documentElement.clientWidth - 100) {
        newLeft = document.documentElement.clientWidth - 100
        xSpeed *= -1
      }

      if (newTop <= 0) {
        newTop = 0
        ySpeed *= -1
      } else if (newTop >= document.documentElement.clientHeight - 100) {
        newTop = document.documentElement.clientHeight - 100
        ySpeed *= -1
      }

      this.setState({
        left: newLeft,
        top: newTop,
        xSpeed,
        ySpeed
      })
    }, duration)
  }

  render() {
    return (
      <div className='ball' style={{
        left: this.state.left,
        top: this.state.top,
        backgroundColor: this.state.bg
      }}>
      </div>
    )
  }
}
