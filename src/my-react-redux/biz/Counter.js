import React from 'react'

import connect from '../connect';

import { increase, decrease, autoIncrease, cancelAutoIncrease } from '../store/action/cntActions'

function Counter(props) {
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

function mapStateToProps(state, props) {
  console.log('props: %o', props.user)
  return {
    count: state.countState
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

export default connect(mapStateToProps, mapDispatchToProps)(Counter)