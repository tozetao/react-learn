
function buildDispatch(middlewares, simpleState, originDispatch) {
  let currentDispatch = originDispatch;
  let mw = null;

  while ((mw = middlewares.pop())) {
    let createDispatch = mw(simpleState)
    currentDispatch = createDispatch(currentDispatch)
  }

  return currentDispatch
}

export default function(...middlewares) {
  // 该函数返回一个用于创建Store的函数
  return function(createStore) {
    // 用户创建Store的函数
    return function(reducer, initialState) {
      const store = createStore(reducer, initialState)
      
      let dispatch = () => {
        throw new TypeError('The dispatch is not initial.')
      }

      const simpleState = {
        dispatch: (...args) => {
          dispatch(...args)
        },
        // state: store.getState()
        getState: store.getState
      }

      // const dispatch = buildDispatch(middlewares, simpleState, store.dispatch)

      const dispatchProducers = middlewares.map(middleware => (middleware(simpleState)))
      const dispatchProduct = compose(...dispatchProducers)
      dispatch = dispatchProduct(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose(...fns) {
  // 如果没有复合的函数，则返回的函数将会原封不动的返回参数。
  if (fns.length === 0) {
    return args => args
  } else if (fns.length === 1) {
    return fns[0]
  }

  return fns.reduce((previous, current) => {
    return (...args) => previous(current(...args))
  })

  // let lastResult = undefined;
  // return function (...args) {
  //   for (let i = fns.length - 1; i >= 0; i--) {
  //     const fn = fns[i];
  //     if (i === fns.length - 1) {
  //       lastResult = fn(...args)
  //     } else {
  //       lastResult = fn(lastResult)
  //     }
  //   }
  //   return lastResult
  // }
}

// const fn1 = (n) => {
//   console.log('fn1')
//   return n+1
// }
// const fn2 = (n) => {
//   console.log('fn2')
//   return n*2
// }

// const fn3 = (n) => {
//   console.log('fn3')
//   return n - 10
// }

// const f = compose(fn1, fn2, fn3)
// console.log(f(10))


// const numbers = [1,2,3,4,5]
// console.log(numbers.reduce((a, b) => {
//   console.log('a: %o, b: %o', a, b)
//   return a + b
// }))