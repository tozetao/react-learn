import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const signUp = 1


/*
受保护的路由：本质上是在Route的render中进行业务逻辑判断。
*/
function ProtectedRoute({ component, children, render, ...rest }) {
  // render
  return <Route {...rest} render={routeContext => {
    if (signUp) {
      // 当满足授权条件时，显示要跳转的组件。
      return <CompA />
    } else {
      // 返回登录页
      return <Redirect to={{
        path: '/login',
        // return_url, 用于登录页跳转。当然，也可以将跳转内容存储到state属性。
        search: '?return_url=' + routeContext.location.pathname
      }} />
    }
  }} />
}

function CompA() {
  return (<div>
    Component A.
  </div>)
}

function User() {
  return (<div>
    Component User.
  </div>)
}

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Link to='/compa'>CompA</Link>
        </div>
        <div>
          <Link to='/user'>User</Link>
        </div>
        <ProtectedRoute path='/compa' component={CompA} />
        <Route path='/user'>
          <User />
        </Route>
      </Router>
    </div>
  )
}
