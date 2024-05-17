import React, { Component } from 'react'

export default class StateDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number1: 0,
      number2: 0
    }

    this.handleClick = this.handleClick.bind(this)

    // // 同步渲染
    // const timer = setInterval(() => {
    //   this.setState({
    //     number2: this.state.number2 + 1
    //   })  
    //   console.log(this.state.number2)
    //   if (this.state.number2 === 10) {
    //     clearInterval(timer)
    //   }
    // }, 1000)
  }
  
  
  handleClick() {
    // // 由于setState是在HTML元素的时间内，因此是异步渲染的
    // this.setState({
    //   number1: this.state.numbnumber1er + 1
    // })
    // console.log(this.state.number1)

    // 如果setState()的参数是函数，React会将这些函数放入队列，依次合并组件状态，最后执行渲染。
    this.setState({
      number1: this.state.number1 + 1
    })

    this.setState(current => {
      console.log(current.number1)
      current.number1++
      return current
    })
  }


  render() {
    console.log('render compoent')
    const render = (
      <div>
        <p>Number1: {this.state.number1}</p>
        <p>Number2: {this.state.number2}</p>
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
    return render
  }
}
