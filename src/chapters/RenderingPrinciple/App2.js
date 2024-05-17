
import React, { Component } from 'react'

class CompA extends Component {
  state = {
    cnt: 0
  }

  render() {
    if (this.state.cnt === 1) {
      return (
        <h3>CompC is unmounted.</h3>
      )
    }
    return (
      <div id="compa">
        <h3>CompA, {this.props.title}</h3>
        <button onClick={() => {
          this.setState({
            cnt: this.state.cnt + 1
          })
        }}>卸载子组件</button>

        <CompB title={this.props.title} />
      </div>
    )
  }

  componentDidUpdate() {
    console.log('CompA componentDidUpdate')
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

  componentWillUnmount() {
    console.log('CompC componentWillUnmount')
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
