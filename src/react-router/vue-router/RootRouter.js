import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

import routeConfig from './routes';

function getValidPath(path) {
  return path.replace(/\/+/, '/')
}

function getRoutes(routeArr, basePath) {
  if (!Array.isArray(routeArr)) {
    return null
  }

  const routes = routeArr.map(({ path, children, component: Component }, index) => {  
    const newPath = getValidPath(basePath + '/' + path)
    
    return (<Route key={index} path={newPath} render={context => {
      return <Component {...context}>{ getRoutes(children, newPath) }</Component>
    }} />)
  })

  return <Switch>{ routes }</Switch>

  // const routes = []
  // routeArr.forEach(({ component: Component, path, children }, index) => {
  //   let childrenComps = null
  //   if (Array.isArray(children)) {
  //     childrenComps = getRoutes(children, path)
  //   }

  //   const newPath = getValidPath(basePath + '/' + path)

  //   routes.push(
  //     <Route key={index} path={newPath} render={context => {
  //       return <Component {...context}>
  //         { childrenComps }
  //       </Component>
  //     }} />
  //   )
  // });
  // return <Switch>
  //   {routes}
  // </Switch>
}

export default function RootRouter(props) {
  return (<>
    {/* 渲染所有根路由组件 */}
    { getRoutes(routeConfig, '/') }
  </>)
}
