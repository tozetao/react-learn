import React, { Component } from 'react'

export default function withLogWrapper(AppComponent) {
  // // 注2：不在修改传入的组件。这种操作意味着将业务交给传入组件处理，它处理了不该承担的业务。
  // AppComponent.prototype.componentDidMount = function() {
  //   // do something
  // }

  return class LogWrapper extends Component {
    componentDidMount() {
      console.log(`组件${AppComponent.name}挂载完毕.`)
    }
    
    componentWillUnmount() {
      console.log(`组件${AppComponent.name}被销毁了.`)
    }

    render() {
      return <AppComponent />
    }
  }
}
