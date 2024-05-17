import React, { Component } from 'react'
import Ball from './Ball'

export default class BallList extends Component {
  constructor(props) {
    super(props)

    // 定时的随机生成Ball组件配置
    this.state = {
      configurations: []
    }

    let cnt = 0
    const timer = setInterval(() => {
      cnt++
      this.state.configurations.push({
        xSpeed: this.randomInt(100, 500),
        ySpeed: this.randomInt(100, 500),
        left: this.randomInt(0, document.documentElement.clientWidth - 100),
        top: this.randomInt(0, document.documentElement.clientHeight - 100),
        bg: `rgb(${this.randomInt(0, 255)},${this.randomInt(0, 255)},${this.randomInt(0, 255)})`
      })

      this.setState({
        configurations: this.state.configurations
      })

      if (cnt === 10) {
        clearInterval(timer)
      }
    }, 1000)
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  render() {
    const ballList = this.state.configurations.map((config, index) => <Ball key={index} {...config} />)
    return (
      <>
        {ballList}
        {/* <div style={{
          width: 100,
          height: 200,
          backgroundColor: "rgb(50,123,22)"
        }}></div> */}
      </>
    )
  }
}
