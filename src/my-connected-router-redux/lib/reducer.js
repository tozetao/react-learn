import * as actionTypes from './actionTypes'

// reducer: 一个包含history的reducer，用户处理state的不同action
// store: 需要一个中间件来进行处理
// 覆盖BrowserRouter组件，当路由变动时，需要存储路由变化信息。

export default function(history) {
  const initState = {
    action: history.action,
    location: history.location
  }

  return function(state = initState, action) {
    switch(action.type) {
      case actionTypes.LOCATION_CHANGING:
        return action.payload
      default:
        return state
    }
  }
}


/*

需求1：route切换时，触发Store的dispatch，把路由相关信息存储到Store中。

需求2：通过store.dispatch(push())可以跳转路由。
push(): 返回一个action
{
  type: '@@router/CALL_ROUTER_METHOD',
  payload: {
    path: ''
  }
}

*/

/*

store.dispatch({
  action: 'LOCATION_CHANGING',
  payload: {
    action: history.action,
    location: history.location
  }
})

*/
