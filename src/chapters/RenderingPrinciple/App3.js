import React, { Component } from 'react'

class Counter extends Component {
  state = {
    n: 0
  }

  render() {
    return <div>
      <div>count: {this.state.n}, index: {this.props.n}, <button onClick={() => {
        this.setState({
          n: this.state.n + 1
        })
      }}>Click</button></div>
    </div>
  }
}

export default class App3 extends Component {
  state = {
    counters: [<Counter n={1} />, <Counter n={2} />],
    totalCounter: 2
  }

  render() {
    // 当点击新建按钮时，App3组件的渲染时会进行节点diff对比
    // 把组件插入到数组第一项时，没有给组件设置key，导致diff对比时，旧组件节点和新组件节点是相同的，
    // 那么新节点会重用旧节点的组件对象，导致新节点会使用旧节点的state对象来渲染虚拟DOM树，所以可以看到，
    // 新插入的组件count值总是等于旧组件的count值，而组件节点的props是由App组件的state传入，渲染出来的文本节点就会进行给更新。
    return (
      <div>
        <div>
          {this.state.counters}
        </div>
        <button onClick={() => {
          const totalCounter = this.state.totalCounter + 1
          this.setState({
            counters: [<Counter n={totalCounter} />, ...this.state.counters],
            totalCounter
          })
        }}>New</button>
      </div>
    )
  }
}
