import React from 'react'

import Store from './store/index'

import Provider from './Provider';
import Counter from './biz/Counter';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState({
    name: '',
    age: 0
  })

  return (<>
    <Provider value={Store}>
      <Counter user={user} />
      <div>
        <button onClick={() => {
          setUser({
            name: 'hello',
            age: Math.ceil(Math.random() * 80)
          })
        }}>Change ID</button>
      </div>
    </Provider>
  </>)
}
