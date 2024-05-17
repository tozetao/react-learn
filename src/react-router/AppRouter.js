import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/a">About</Link>
            </li>
            <li>
              <Link to="/a/b">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> 会遍历所有包含的 <Route>s 并渲染匹配的第一条 */}
        <Switch>
          <Route path="/a">
            <About />
          </Route>
          <Route path="/a/b">
            <Users />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}