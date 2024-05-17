function firstInitialAction() {
  const key = Math.random().toString(32).substring(2, 6).split('').join('.')
  return '@@redux/INIT.' + key
}

function isPlainObject(action) {
  return typeof action === 'object' && action.__proto__ === Object.prototype
}

export function createStore(reducer, initialState, enhance) {
  /**
   * 简单的处理不同树木参数的情况
   * createStore(reducer, applyMiddleware(f1, f2, f3))
   * 
   * createStore(reducer, undefined, applyMiddleware(f1, f2, f3))
   * createStore(reducer, initialState, applyMiddleware(f1, f2, f3))
   */
  if (typeof initialState === 'function') {
    enhance = initialState
    initialState = undefined
  }

  if (typeof enhance === 'function') {
    return enhance(createStore)(reducer, initialState)
  }
  
  let currentReducer = reducer, currentState = initialState;
  const handlers = []

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new TypeError('action must be a plain object')
    }

    currentState = currentReducer(currentState, action)
    
    handlers.forEach(handler => {
      handler()
    });
  }

  function getState() {
    return currentState
  }

  function subscribe(handler) {
    handlers.push(handler)

    return () => {
      const index = handlers.indexOf(handler)
      if (-1 !== index) {
        handlers.splice(index, 1)
      }
    }
  }

  const action = firstInitialAction()

  // createStore
  // initialState有值时，使用initialState的值，否则使用reducer函数的state参数的值。
  // if (initialState) {
  //   currentReducer(undefined, action)
  //   currentState = initialState
  // } else {
  //   currentState = currentReducer(undefined, action)
  // }
  
  dispatch({
    type: action
  })

  return {
    dispatch,
    getState,
    subscribe
  }
}

/**
 * 
 * @param {function|object} actionCreator 
 *  actionCreator可以是函数或者对象。如果是对象，对象的属性值都是用于创建action；也可以是一个用于创建actino的函数。
 *  {
      addUser: getAddUserAction,
      removeUser: getRemoveUserAction
    }
 * @param dispatch 
 * @returns 
 */
export function bindActionCreators(actionCreator, dispatch) {
  if (typeof actionCreator === 'function') {
    return getActionDispatcher(actionCreator, dispatch)
  } else if (typeof actionCreator === 'object') {
    const reulst = {}
    for (const key in actionCreator) {
      if (Object.hasOwnProperty.call(actionCreator, key)) {
        if (typeof actionCreator[key] === 'function') {
          reulst[key] = getActionDispatcher(actionCreator[key], dispatch)
        }
      }
    }
    return reulst
  } else {
    throw new TypeError('type error')
  }
}

function getActionDispatcher(actionCreator, dispatch) {
  return function(...args) {
    const action = actionCreator(...args)
    dispatch(action)
  }
}


/**
 * 将reducers中的reducer合并，返回一个新的reducer函数。
 * 
 * @param reducers 由reducer组成的对象。
 */
export function combineReducers(reducers) {
  // validateReducers(reducers)

  return function(state = {}, action) {
    const newState = {}

    for (const key in reducers) {
      if (Object.hasOwnProperty.call(reducers, key)) {
        const reducer = reducers[key];
        newState[key] = reducer(state[key], action)
      }
    }

    return newState;
  }
}

function validateReducers(reducers) {
  // 必须是一个纯对象。
  if (typeof reducers !== 'object') {
    throw new TypeError('The reducers param is not a object');
  }

  if (!isPlainObject(reducers)) {
    throw new TypeError('The reducers param must be a plain object.');
  }
  
  // reducers中的每个reducer返回值不能是undefined。因此需要执行reducer，判断返回值。
  // 这就是为什么初始化仓库时，reducer会执行一次的原因。
}