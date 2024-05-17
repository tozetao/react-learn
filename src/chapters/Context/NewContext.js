import React, { Component } from 'react'

/**
 * 注：
 * 如果Contxt.Provider中的value属性发生变化，会导致该上下文的所有后代元素全部重新渲染。
 * 且该重新渲染会忽视shouldComponentUpdate()函数返回值。
 */

const ctx = React.createContext()
const anotherCtx = React.createContext()

function A() {
  return (
    <div>
      <anotherCtx.Provider value={{
        apples: 100
      }}>
        <div>
          <h3>A component</h3> 
          <ctx.Consumer>
            {value => (
              <div>
                Inner Context, Apples: <span>{value.apples}</span>
              </div>
            )}
          </ctx.Consumer>
          <anotherCtx.Consumer>
            {
              value => {
                return (
                  <div>
                    Another Context, Apples: {value.apples}
                  </div>
                )
              }
            }
          </anotherCtx.Consumer>
        </div>
        <B />
      </anotherCtx.Provider>
    </div>
  )
}

class B extends Component {
  // 单个Context绑定，通过this.context来进行访问。
  static contextType = ctx;

  render() {
    return (
      <div>
        <h3>B component</h3>
        <p>
          Apples: {this.context.apples}
        </p>
      </div>
    )
  }
}



export default class NewContext extends Component {
  state = {
    apples: 0
  }

  render() {
    return (
      <ctx.Provider value={this.state}>
        <div>
          <h3>NewContext Test.</h3>
          <div><button onClick={() => {
            this.setState({
              apples: this.state.apples + 1
            })
          }}>Click</button></div>

          <A />
        </div>
      </ctx.Provider>
    )
  }
}
