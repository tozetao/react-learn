**useState**



```js
function useState(value)
```

该hook返回一个数组，数组第一个元素是state设置的值，第二个元素是一个函数，用于设置state，可以成为setter。



**原理**

类组件的状态是保存在类组件对象中，但是函数组件是没有状态的，它的状态是挂在到了函数组件对应的节点对象中。

```
function User() {
	const [count, setCocunt] = setState(0)
	const [visible, setVisible] = setState(false)
    return <div>这是组件内容</div>
}

function App() {
    return <>
    	<User>
    <>
}
```

在构建虚拟DOM树时，会创建一个节点（React Component）来表示<User>函数组件，为了方便说明，我们将其成为User节点。

User节点对应着User组件，节点会有一个数组用来存储组件的状态。我们举例来说明状态存取的过程。

当User组件初次初始化时，第一次调用setState hook时，会去对应节点状态数组的0小标寻找数据，因为是第一次初始化化，状态数组不存在数据，所以会使用默认值进行初始化。

如果使用setter函数去改变状态，那么会去节点数组索引0的位置取出该值，将新数据与原有数据进行对比（Object.is)。只有在数据不相等时才会重新渲染组件。

这是会重新执行函数代码，useState hook根据索引去节点的状态数组中取值时，发现是有值的，也就不会使用默认值进行初始化，而是直接返回状态数组存储的值。

最后使用新的状态来渲染页面。









**建议**

1. useState的最好写在函数体的最前面。

2. 当状态之间没有必然联系时，把状态分开来定义，而不要合并为一个对象。

    ```js
    // 比如在一个组件内user数据表示用户数据，而visible表示Dialog的显示状态，没有关联的状态就应该分开定义。
    const [user, setUser] = useState({
        name: '',
        age: 10
    })
    const [visible, setVisible] = useState(false)
    ```


**注意**

1. 和类组件的状态一样，在函数内的状态改变是异步的（在DOM事件中），多个状态的变化会合并以提高效率。此时不能信任之前的状态。如果要依赖之前的回调函数，应该使用回调函数。

```js
<button onClick={() => {
    // error
    setCnt(n - 1);
    setCnt(n - 1);
    setCnt(n - 1);
    // right
    // 
    const fn = cnt => {
        console.log(cnt)
        return cnt + 1
    }
    setCnt(fn)
    setCnt(fn)
    setCnt(fn)
}}>Click</button>
```

2. 不允许在判断内、循环体内使用useState hook。

3. 在函数组件中可以通过

4. 在使用useState hook的setter改变数据时，会通过Object.is()进行相等判断。若数据和之前数据是相等的，那么不会组件重复渲染。

5. 与类组件不同，使用hook的setter函数改变数据时，是直接赋值，而不会合并数据。

    ```js
    const [user, setUser] = useState({name: '', age: 25});
    
    // user保存的对象将会被直接覆盖，user = 'abc'
    setUser('abc')
    ```


