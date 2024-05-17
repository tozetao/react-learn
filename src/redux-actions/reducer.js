
import { handleActions } from 'redux-actions';
import actions from './actions';

// const reducer = handleAction(actions.increase, (state) => {
//   return {
//     count: state.count + 1
//   }
// }, {
//   count: 10
// })

const reducer = handleActions({
  [actions.increase]: state => {
    return {
      count: state.count + 1
    }
  },
  [actions.add]: (state, action) => {
    console.log(action)
    return {
      count: state.count + action.payload
    }
  },
}, {
  count: 0
})

export default reducer