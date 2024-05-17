import React, { useMemo, useState } from 'react'

// 注：在组件重新渲染时，如果React Element引用没有发生变化，该节点不会重新渲染。

function Item(props) {
  console.log('Item render.')
  return <li>{props.value}</li>
}

export default function Example1() {
  const [range, ] = useState({min: 1, max: 500})
  const [cnt, setCnt] = useState(0)

  // // 由于每次渲染时重新生成了新的Item节点数组，每次Item节点都是新的，因此会重新渲染
  // const list = []
  // for (let i = range.min; i < range.max; i++) {
  //   list.push(<Item value={i} key={i} />)
  // }
  
  const list = useMemo(() => {
    const list = []
    for (let i = range.min; i < range.max; i++) {
      list.push(<Item value={i} key={i} />)
    }
    return list
  }, [range])
  
  return (
    <div>
      <input type="text" value={cnt} onChange={event => {
        setCnt(event.target.value)
      }} />
      <ul>
        {list}
      </ul>
    </div>
  )
}
