import { runSaga } from './runSaga'

import Channel from './channel';

// console.log(Channel)

// 用于创建saga中间件
export default function createSagaMiddleware() {
  return function sagaMiddleware(store) {
    const env = {
      store,
      channel: new Channel()
    }

    sagaMiddleware.run = runSaga.bind(null, env)

    return function(next) {
      return function(action) {
        // console.log('dispatch action: %o', action)
        const result = next(action)
        env.channel.put(action.type, action)
        return result
      }
    }
  }
}