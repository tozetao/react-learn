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
