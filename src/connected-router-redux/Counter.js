import React from 'react'
import { connect } from 'react-redux';

import { increase, decrease, autoIncrease, cancelAutoIncrease } from './store/action/cntActions'

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

// ownProps: 使用者传递的属性对象。
function mapStateToProps(state, ownProps) {
  console.log('own props: ', ownProps)

  return {
    count: state.countState
  }
}

// ownProps: 同上
function mapDispatchToProps(dispatch, ownProps) {
  console.log('own props: ', ownProps)

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
