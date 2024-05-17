import React, { Component } from 'react'
import Store from './store/index'

import { increase, decrease, autoIncrease, cancelAutoIncrease } from './store/action/cntActions'
import Users from './Users'

export function Counter(props) {
  return (
    <div>
      <h3>{ props.count }</h3>
      <div>
        <button onClick={() => props.onIncrease() }>+</button>
        <button onClick={() => props.onDecrease() }>-</button>
        <button onClick={() => props.onAutoIncrease() }>auto increase</button>
        <button onClick={() => props.onAutoDecrease() }>auto decrease</button>
        <button onClick={() => props.onCancelAutoIncrease() }>cancel auto increase</button>
      </div>
    </div>
  )
}

function mapStateToProps(store) {
  return {
    count: store.getState().countState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrease() {
      dispatch(increase())
    },
    onDecrease() {
      dispatch(decrease())
    },
    onAutoIncrease() {
      dispatch(autoIncrease())
    },
    onAutoDecrease() {
      console.log('onAutoDecrease')
    },
    onCancelAutoIncrease() {
      dispatch(cancelAutoIncrease())
    }
  }
}

export default class CounterContainer extends Component {
  state = {
    count: 0
  }

  constructor(props) {
    super(props)
    this.state = mapStateToProps(Store)

    Store.subscribe(() => {
      this.setState(mapStateToProps(Store))
    })
  }

  render() {
    console.log('The counter is rendering.')
    const eventHandlers = mapDispatchToProps(Store.dispatch)
    return (<>
      <Counter
        {...this.state}
        {...eventHandlers}
      />
    </>)
  }
}
