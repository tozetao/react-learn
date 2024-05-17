import React, { Component } from 'react'

export default class NewLifeCycle extends Component {
  // 初始化阶段。初始化props和state
  constructor(props) {
    super(props)
    this.state = {
      cnt: props.cnt
    }
  }

  /*
  一个节点在挂载阶段会
  */

  // 用于获取新的属性和状态
  // getDerivedStateFromProps()， 一个静态方法，始终在render()方法之前运行。组件初次渲染，或者组件属性或状态改变时会运行该方法。

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('props: %o, state: %o', nextProps, prevState);

    // 表示不更新state
    // return null;

    // 返回的对象会混合到state中，用于更新state对象

    // 可以在该方法内去更新组件state，造成的后果就是在组件内，你无法更新state中数据，
    // 比如cnt属性在下方的事件中的更改是不会生效的，因为被nextProps覆盖了
    return {
      cnt: nextProps.cnt
    }
  }

  // 挂载阶段。
  // React16在挂载阶段废弃了componentWillMount。

  render() {
    console.log('render')
    return (
      <div>
        <p>{this.state.cnt}</p>
        <p>
          <button onClick={() => {
            this.setState({
              cnt: this.state.cnt + 1
            })
          }}>改变状态</button>
        </p>
      </div>
    )
  }

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  // 当组件被挂载后会立即调用。在这里改变state会重新触发render()
  componentDidMount() {
    console.log('componentDidMount')
  }


  // 更新阶段
  // 废弃了componentWillReceiveProps，当props或者state改变时，都会先运行getDerivedStateFromProps静态方法。再运行shouldComponentUpdate()。

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  // 在React将结果渲染到文档之前运行，并返回一个对象供componentDidUpdate使用。比如在渲染导致变化之前保存滚动位置等事物时非常有用。
  // 注意：getSnapshotBeforeUpdate 的存在会阻止任何已废弃生命周期事件的运行。
  // 说明：在真实DOM树构建完成，但是还未实际渲染到页面中。
  // Runs before React applies the result of render to the document, and returns an object to be given to componentDidUpdate. 
  // Useful for saving things such as scroll position before render causes changes to it.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate, prevProps: %o, prevState: %o', prevProps, prevState)
    return {
      version: 1.0
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate, snapshot: ', snapshot)
  }
}
