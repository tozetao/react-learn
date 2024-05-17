import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { bindActionCreators } from 'redux';

import ctx from './ctx'

function compare(a, b) {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

// 连接Store与组件。
export default function connect(mapStateToProps, mapDispatchToProps) {
  // 返回一个高阶组件
  return function(Comp) {
    function getHandlers(store, props) {
      if (typeof mapDispatchToProps === 'function') {
        return mapDispatchToProps(store.dispatch, props)
      }
      if (typeof mapDispatchToProps === 'object') {
        return bindActionCreators(mapDispatchToProps, store.dispatch)
      }
      return {}
    }

    return function(props) {
      const store = useContext(ctx)

      const [state, setState] = useState(mapStateToProps && mapStateToProps(store.getState(), props))

      useEffect(() => {
        // props是一个对象，因此可以获取最新的值。
        return store.subscribe(() => {
          setState(prevState => {
            const newState = mapStateToProps(store.getState(), props)
            if (!compare(prevState, mapStateToProps(store))) {
              setState(newState)
            }
          })
        })
      }, [store])

      let handlers = {}
      if (mapDispatchToProps) {
        handlers = getHandlers(store, props)
      }

      return (<Comp {...state} {...handlers} {...props} />)
    }
  }

  // 类组件实现
  // return function(Comp) {
  //   class ConnectCreator extends React.PureComponent {
  //     static contextType = ctx
  
  //     store;

  //     state = {};

  //     handlers = {};

  //     constructor(props, context) {
  //       super(props, context)
  //       this.store = context

  //       if (typeof mapStateToProps === 'function') {
  //         this.state = mapStateToProps(this.store.getState(), props)

  //         this.unListener = this.store.subscribe(() => {
  //           this.setState(mapStateToProps(this.store.getState(), props))
  //         })
  //       }

  //       if (typeof mapDispatchToProps === 'function') {
  //         this.handlers = mapDispatchToProps(this.store.dispatch, props)
  //       } else if (typeof mapDispatchToProps === 'object') {
  //         this.handlers = bindActionCreators(mapDispatchToProps, this.store.dispatch)
  //       }
  //     }

  //     componentWillUnmount() {
  //       this.unListener && this.unListener()
  //     }
  
  //     render() {
  //       return (<>
  //         <Comp {...this.props} {...this.state} {...this.handlers} />
  //       </>)
  //     }


  //   }
  //   ConnectCreator.displayName = `Connect(${Comp.displayName || Comp.name})`
  //   return ConnectCreator
  // }

}
