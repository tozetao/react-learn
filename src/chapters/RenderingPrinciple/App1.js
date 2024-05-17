
import React, { Component } from 'react'

class CompA extends Component {
  render() {
    return (
      <div id="compa">
        <h3>CompA, {this.props.title}</h3>
        <CompB title={this.props.title} />
      </div>
    )
  }
}

function CompB(props) {
  return (
    <div id='compb'>
      <h3>CompB, {props.title}</h3>
      <CompC title={props.title} />
    </div>
  )
}

class CompC extends Component {

  render() {
    return (
      <div id="compc">
        <h3>CompC, {this.props.title}</h3>
      </div>
    )
  }

  componentDidUpdate() {
    // 点击App组件按钮，可以看到'#compa>h3'包含更改后的值。可以看出生命周期函数确实是在虚拟dom树渲染完成后再执行的。
    console.log('CompA componentDidUpdate', document.querySelector('#compa>h3'))
  }
}

export default class App extends Component {
  state = {
    title: '123'
  }

  render() {
    return (
      <div>
        <h3>App Component</h3>
        <button onClick={() => {
          this.setState({
            title: '456'
          })
        }}>Change Title</button>
        <CompA title={this.state.title} />
      </div>
    )
  }
}
