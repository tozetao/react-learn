import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Admin from './pages/index';
import Login from './pages/login';

// 编写路由代码
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/'>
          <Admin />
        </Route>
      </Switch>
    </Router>
  )
}
