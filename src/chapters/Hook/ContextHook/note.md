Context

Context即上下文的意思。Context是在组件之间共享数据的一种方式。

当使用Context将一块内容区域（节点树）包裹起来时，这个节点树下的所有子节点（组件）都共享Contenxt的数据。

在React16中，Context是成对出现的，分别是Provider、Consumer。Provider负责提供Context的数据，Consumer负责使用Provider提供的数据。比如：

```js
import React from 'react'

const ctx = React.createContext()

function Display() {
  return (<>
    <ctx.Consumer>
      {context => {
        return <div>
          <p>platform: { context.platform }</p>
          <p>version: { context.version }</p>
        </div>
      }}
    </ctx.Consumer>
  </>)
}

export default function Test() {
  const config = {
    version: 1.0,
    platform: 'platform name'
  }
  return (
    <div>
      <ctx.Provider value={config}>
        <Display />
      </ctx.Provider>
    </div>
  )
}
```

注：在Provider的包裹下，可以在任意子节点通过Consumer访问Provider提供的Context数据。



在函数式编程中，可以使用useContext() Hook来使用Context的数据，这样避免了ctx.Consumer节点。

```js
import React, { useContext } from 'react'

const ctx = React.createContext()

function Display() {
  const config = useContext(ctx)
  return (
    <div>
      <p>platform: { config.platform }</p>
      <p>version: { config.version }</p>
    </div>
  )
}

export default function Test() {
  const config = {
    version: 1.0,
    platform: 'platform name'
  }
  return (
    <div>
      <ctx.Provider value={config}>
        <Display />
      </ctx.Provider>
    </div>
  )
}
```





