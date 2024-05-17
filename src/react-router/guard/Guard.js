import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom/cjs/react-router-dom.min'

function PageA() {
  return (<div>
    Page A.
  </div>)
}

function PageB() {
  return (<div>
    Page B.
  </div>)
}

// function Guard(props) {
//   // props.location: 表示当前组件的路由信息。注：由于函数组件每次渲染都会执行，因此location表示当前最新的路由信息。
//   const { history } = props
  
//   useLayoutEffect(() => {
//     console.log('use layout effect')

//     // location: 记录当前的地址信息
//     // action: 表示进入该地址的方式，比如push、pop。在浏览器历史记录中，pop值得是指针后退，push表示指针前进。
//     history.listen((location, action) => {
//       // listen的回调函数是在路由发生变化时（未渲染目标组件）执行，因此props.location保存的是上一次的路由信息。
//       console.log(action, props.location, location)
//     })
//   }, [history])

//   return (<>
//     {props.children}
//   </>)
// }

let from = null, to = null, action = ''
let unBlock = null, unListen = null

class _GuardHelper extends Component {
  componentDidMount() {
    unBlock = this.props.history.block((location, _action) => {
      from = this.props.location
      to = location
      action = _action
      return ''
    })

    this.unListen = this.props.history.listen((location) => {
      if (this.props.onChangeRoute) {
        this.props.onChangeRoute(this.props.location, location, this.unListen)
      }
    })
  }

  componentWillUnmount() {
    unBlock()
    this.unListen()
  }

  render() {
    return null
  }
}

const GuardHelper = withRouter(_GuardHelper)

class Guard extends Component {
  handleConfirmation = (_message, next) => {
    if (this.props.onBeforeChange) {
      this.props.onBeforeChange(from, to, next, unBlock)
    } else {
      next(true)
    }
  }
  
  render() {
    return (
      <Router getUserConfirmation={this.handleConfirmation}>
        <GuardHelper onChangeRoute={this.props.onChangeRoute} />
        { this.props.children }
      </Router>
    )
  }
}

export default function App() {
  return (
    <Guard
      onBeforeChange={(from, to, next, unBlock) => {
        console.log('from: %o, to: %o', from.pathname, to.pathname)
        next(true)
      }}
      onChangeRoute={(from, to, unListen) => {
        console.log('onChangeRoute: ', from, to)
        // unListen()
      }}
    >
      <ul>
        <li>
          <Link to='page_a'>页面1</Link>
        </li>
        <li>
          <Link to='page_b'>页面2</Link>
        </li>
      </ul>
      <Route path='/page_a' component={PageA} />
      <Route path='/page_b' component={PageB} />
    </Guard>
  )
}

/*
导航守卫
  指在页面发生变化时触发的事件。

### History对象

- listen
  原型：function listen(handler): cancelFunc
  listen属性是一个方法，它接受一个回调函数。当地址发生变化时，会调用传递的函数。调用时机发生在进入页面之前。
  cancelFunc是取消监听的事件，执行cancelFunc后，将不在监听原本绑定的事件。

- block
  为路由跳转设置一个阻塞。如果设置了路由阻塞，当路由发生变化时，将会调用Router组件的getUserConfirmation方法。
  在Router的getUserConfirmation中，我们做一些处理，决定是否进行路由跳转。

  block接受一个字符串，或者回调函数。
  字符串和回调函数返回的字符串，都会于传递给getUserConfirmation。

  该回调函数的参数与listen的回调函数的参数是相同的。

*/