import React, { Component } from 'react'

export default class RefTest extends Component {

  constructor(props) {
    super(props)
    this.inputRef = null
    this.state = {
      show: true
    }

    this.currentRef = {
      current: null
    }
  }

  render() {
    return (
      <div>
        <input ref={this.currentRef} type="text" />

        <div>
          <button onClick={() => {
            console.log('change state', this.currentRef)
            this.setState({})
          }}>Click</button>
        </div>
      </div>
    )
  }

  // getInputRef = element => {
  //   console.log('set inputRef: ', element)
  //   this.inputRef = element
  // }

  // Ref的值如果是函数表达式，组件初次渲染会调用一次，之后每次渲染时，上一次旧的函数会运行一次（参数为null），新的函数也会运行一次（参数会Ref引用的对象）。
  // render() {
  //   return (
  //     <div>
  //       <input ref={ele => {
  //         console.log('set ref: ', ele)
  //         this.inputRef = ele
  //       }} type="text" />

  //       <div>
  //         <button onClick={() => {
  //           console.log('change state')
  //           this.setState({})
  //         }}>Click</button>
  //       </div>
  //     </div>
  //   )
  // }
  // 相反，Ref如果是一定固定的函数，那么每次渲染的时候都会调用一次。
  // render() {
  //   return (
  //     <div>
  //       {this.state.show ? <input ref={this.getInputRef} type="text" /> : null}
  //       <div>
  //         <button onClick={() => {
  //           console.log('change state: ', this.inputRef)
  //           this.setState({})
  //         }}>Click</button>
  //         <button onClick={() => {
  //           this.setState({
  //             show: !this.state.show
  //           })
  //         }}>Show/Hidden</button>
  //       </div>
  //     </div>
  //   )
  // }

}
