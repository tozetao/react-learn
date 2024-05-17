import React from 'react'

import Store from './store/index'

import Provider from './Provider';
import Counter from './biz/Counter';

export default function App() {
  return (<>
    <Provider value={Store}>
      <Counter />
    </Provider>
  </>)
}
