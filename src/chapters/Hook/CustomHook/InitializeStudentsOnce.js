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

// 分离的点：仅在组件首次渲染时获取学生数据。
// 如果是使用组件，可以通过高阶组件来实现。
export default function useInitializeStudentsOnce() {
  console.log('InitializeStudentsOnce')
  const [stduents, setStudents] = useState([])
  useEffect(() => {
    fetchStudents().then(data => {
      setStudents(data)
    })
  }, [])
  return stduents
}