import React, { Component } from 'react'

// 旧版本的组件生命周期可以分为3个阶段：初始化阶段、挂载阶段、更新阶段。

export default class OldLifeCycle extends Component {

  // Only run once, Prohibit calling setState() method as the component has not been mounted yet
  constructor(props) {
    super(props)
    this.state = {
      cnt: 100
    } 
  }

  // 组件即将挂载到页面。
  // 仅运行一次，但是在某些情况下，该函数可能被调用多次。比如可能在组件还没有挂载完成阶段，
  // React可能会把组件的初始化过程打断，重走整个初始化过程。虽然在该函数可以使用setState()，但是为了避免bug，不允许使用。
  componentWillMount() {
  }

  // 渲染虚拟DOM，JSX就是一个ReactElement对象。render()返回的对象会挂载到虚拟DOM树中。
  render() {
    return (
      <div>
        OleLifeCycle, State Cnt: {this.state.cnt}, Props cnt: {this.props.cnt}
        <p>
          <button onClick={() => {
            this.setState({
              cnt: this.state.cnt + 1
            })
          }}>改变State</button>
        </p>
      </div>
    )
  }

  // mounted: 挂载，将一个React对象转换为页面的DOM对象。

  // 虚拟DOM已经挂载到页面，成为HTML DOM。
  // 仅运行一次
  componentDidMount() {
    console.log('componentDidMount')
  }

  // 在更新阶段，组件的属性（props）和状态（state）可能会发生变化，针对这俩种状态也有对应的生命周期函数。

  // 即将接收到新的属性对象
  componentWillReceiveProps(nextProps) {
    // 这时当前的属性对象还未被改变
    console.log('componentWillReceiveProps, ', this.props, nextProps)
  }

  // Called to determine whether the change in props and state should trigger a re-render.
  // 该方法可以用于确定是否在改变props或state时促发重新渲染。
  // Component always returns true. PureComponent implements a shallow comparison on props and state and returns true if any props or states have changed.
  // If false is returned, Component#render, componentWillUpdate and componentDidUpdate will not be called.
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate, ', nextProps, nextState)
    return true
  }

  // 组件即将被重新渲染。=> render()
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  // 更新发生后立即调用，初次render不会调用。
  // 快照只有在 getSnapshotBeforeUpdate 存在且返回值非空时才会出现。
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate, ', prevProps, prevState)
  }

  // 在组件被销毁前立即调用。在此方法中执行任何必要的清理，例如取消网络请求，或清理在 componentDidMount 中创建的任何 DOM 元素。
  componentWillUnmount() {}
}
