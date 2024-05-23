import React from 'react'

import Home from './Home'
import Counter from './Counter'
import { Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import { ConnectedRouter } from './lib/index'

import store from './store/index'
import history from './store/history'
import Nav from './Nav'



/* 切换不同的路由时，在store保存路由信息。 */
export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Nav history={history} />
        <>
          <Switch>
            <Route path="/counter" component={Counter}></Route>
            <Route path="/home" component={Home}></Route>
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  )
}
