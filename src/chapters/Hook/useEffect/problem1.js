import React, { useEffect, useState } from 'react'

const newUser = {
  name: 'Zhangsan',
  age: 35
}

export default function Test() {
  console.log('Test component')

  const [count, setCount] = useState(1)

  const [user, setUser] = useState({
    name: 'Mrs.Li',
    age: 25
  })

  // 如果下一个状态等于先前的状态，React会忽略你的更新。
  // 正常来说，将count从1改为2会渲染一次组件。接着再次设置count为2，应该不会渲染了。但是React渲染了，这是为什么?

  return (<div className='box'>
    <p>count: { count }</p>
    <button onClick={() => {
      setCount(2)
    }}>Set Count</button>

    <p>name: { user.name }, age: { user.age }</p>
    <button onClick={() => {
      setUser(newUser)
    }}>Set User</button>
  </div>)
}
