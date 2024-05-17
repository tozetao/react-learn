
export default function reducer(state = {
  cnt: 0
}, action) {
  const cnt = Number(state.cnt)
  const payload = Number(action.payload)

  switch(action.type) {  
    case 'incr':
      return {
        cnt: cnt + payload
      }
    case 'decr':
      return {
        cnt: cnt - payload
      }
    default:
      return state
  }
}
