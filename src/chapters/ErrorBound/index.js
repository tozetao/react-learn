// 错误边界
// 默认情况下，当一个组件在渲染期间发生错误时，它会将错误抛出直到在React DOM树中有一个组件捕获该错误。
// 如果没有组件捕获该错误，React将会卸载整颗DOM树。表现在页面上就是不会渲染任何东西。

// 错误边界：创建一个组件，用于捕获子组件抛出的错误，并组织错误向上传播。

// 实现方式：
// 1. getDerivedStateFromError
// 该函数是一个静态函数，在渲染子组件过程中，发生错误之后，在更新页面之前触发。
// 注：是只有子组件发生错误才会运行该函数。


// 细节：
// 1. 错误边界组件（自身）在渲染期间发生错误，getDerivedStateFromError和componentDidCatch函数都不会处理
// 2. 异步错误不会处理。比如子组件的事件处理，setTimeout()，或者异步请求
import React, { Component } from 'react'

export default class ErrorBound extends Component {
  state = {
    hasError: false,
    error: null
  }

  // static getDerivedStateFromError(error) {
  //   return {
  //     hasError: true,
  //     error
  //   }
  // }

  // 渲染子组件过程中发生错误，页面已经更新完成促发。
  // 注：在页面更新完成后促发，意味着React组件树已经被卸载过了，因此效率没有上面那个函数高。
  componentDidCatch(error) {
    console.dir('发生错误了, ', error)
    this.setState({
      hasError: true,
      error
    })
  }

  render() {
    // 错误边界组件自身安生错误，是不会捕获到错误的。
    throw new Error('test error.')
    if (this.state.hasError) {
      return <h3>发生错误了</h3>
    }
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

