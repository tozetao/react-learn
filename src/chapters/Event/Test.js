import React, { Component } from 'react'

export default class Test extends Component {
  handleClick = event => {
    console.log('触发点击事件: ', event.target)
    console.log(event.nativeEvent)
  }

  render() {
    return (
      <div id="container" style={{
        backgroundColor: 'yellow'
      }}>
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}
