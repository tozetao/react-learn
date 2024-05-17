import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

// 如何在非Route组件获取Route信息。
function CompA(props) {
  return (<div>
    CompA props: {JSON.stringify(props)}
  </div>)
}
const CompAWrapper = withRouter(CompA)

function News(props) {
  const match = props.match
  
  return (<div>
    <p>News Component.</p>
    <p>Params: {JSON.stringify(match.params)}</p>
    <CompAWrapper />
  </div>)
}

function NotFound() {
  return (<div>
    Not Found Page.
  </div>) 
}

export default function RouteParams() {
  return (
    <Router>
      <Switch>
        {
          // 以: 开头用于匹配变量。同时通过正则表达式，可以约束匹配的变量的内容。

          // 匹配/news /news/2025/10/3
          // /news-:year(\d+)?-:month?/:day?  
        }
        <Route path='/news-:year(\d+)?-:month?/:day?' component={News} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
