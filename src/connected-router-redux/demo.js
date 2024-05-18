import React from 'react'

import Home from './Home'
import Counter from './Counter'
import { Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store from './store/index'
import history from './store/history'
import Nav from './Nav'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'



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
