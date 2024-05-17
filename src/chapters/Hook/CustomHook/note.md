将常见的，跨越多个组件的Hook功能，抽离出来形成一个函数，就是自定义Hook。



自定义Hook

由于自定义hook其内部需要使用hook功能，所以它本身也需要按照hook的规则实现：

1. 函数名必须以use开头。
2. 调用自定义hook时，应该放到顶层。



简单的话，如果某些副作用可以共用多个组件，那么可以将其抽离出来封装成一个hook来使用。



```js
import { useEffect, useState } from 'react'

function fetchStudents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = []
      for (let i = 0; i < 10; i++) {
        list.push({
          name: 'name' + (i+1),
          age: Math.random() * 80
        })
      }
      resolve(list)
    }, 1000)
  })
}

// 声明一个自定义Hook
// 分离的点：仅在组件首次渲染时获取学生数据。如果是使用组件，可以通过高阶组件来实现。
function useInitializeStudentsOnce() {
  console.log('InitializeStudentsOnce')
  const [stduents, setStudents] = useState([])
  useEffect(() => {
    fetchStudents().then(data => {
      setStudents(data)
    })
  }, [])
  return stduents
}

import React from 'react'
import useInitializeStudentsOnce from './InitializeStudentsOnce'

export default function Test() {
  console.log('Test component')
  const students = useInitializeStudentsOnce()

  const list = students.map(item => {
    return <li key={item.name}>{item.name}, age: {item.age}</li>
  })

  return (
    <div>
      <h3>Test Compoent</h3>
      <ul>
        {list}
      </ul>
    </div>
  )
}
```





19.47-

20.00