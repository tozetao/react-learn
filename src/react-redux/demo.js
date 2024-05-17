import React from 'react'

import { Provider } from 'react-redux'
import Counter from './Counter1'
import store from './store/index'

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <h3>This is an App?</h3>
        <Counter rest="rest attr" />
      </div>
    </Provider>
  )
}
