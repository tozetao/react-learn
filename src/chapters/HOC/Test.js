import React, { Component } from 'react'
import User from './User'
import withAuthorization from './withAuthorization'
import withLogger from './withLogger'

let UserWrapper = withLogger(User)
UserWrapper = withAuthorization(UserWrapper)

export default class Test extends Component {

  render() {
    // 注1：不要在render中创建高阶组件。这意味着render()每次渲染时都会创建一个新的高阶组件，原有的高阶组件对象无法重用。    
    // let UserWrapper = withLogger(User)
    // UserWrapper = withAuthorization(UserWrapper)

    // 注2：不要在高阶组件中修改传入的组件。
    return (
      <div>
        <UserWrapper isLoggedIn={false} />
      </div>
    )
  }
}

