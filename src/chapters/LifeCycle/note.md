React16的生命周期

一个组件实例的生命周期：

组件在挂载阶段会执行以下函数：

- constructor()

  实例化组件对象，执行构造函数

- getDerivedStateFromProps()

- render()

  执行render()函数，在这里只是构建React Element对象树，并没有进行真正的渲染。

- componentDidMount()

  节点已经挂载完成，在这里，真实DOM已经渲染完毕。

组件在更新时会执行以下函数：

- shouldComponentUpdate
- getSnapshotBeforeUpdate
- componentDidUpdate