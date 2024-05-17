
展示组件
如果一个组件没有状态，仅用于下渲染UII界面，该组件就称为展示组件。

容器组件
如果一个仅提供数据，没有任何自己的UI界面，就称为容器组件。容器组件仅用于给其他组件提供数据。

### react-redux
桥接了react组件与redux仓库。它给react组件提供仓库的数据，而当组件触发事件改变状态时，可以将改变的数据同步给仓库。


Provider组件
  不提供任何UI界面，它会将redux的仓库放置到一个上下文中。

connect(state, dispatch)
  高阶组件，用于连接仓库和组件。
  connect返回一个函数，用于创建一个高阶组件。如果在该组件中传递props，这些props会透传的包装的UI组件。

  state: 

  dispatch: 