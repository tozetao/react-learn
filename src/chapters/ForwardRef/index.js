import React, { Component } from 'react'

function FnComponent(props, ref) {
  return <div className='fn-component' ref={ref}>
    函数组件的Ref转发
    <p>props: {props.toString()}</p>
  </div>
}
const FnComponentWrapper = React.forwardRef(FnComponent)



class ClassComponent extends React.Component {
  render() {
    return (
      <div className='class-component' ref={this.props.ref1}>
        类组件的Ref转发
      </div>
    )
  }
}
const ClassComponentWrapper = React.forwardRef((props, ref) => {
  return (
    <ClassComponent ref1={ref} {...props} />
  )
})

/**
 * FofrwardRef：一般用于做函数组件Ref的映射。注：函数组件是无法使用Ref的。
 */
export default class ForwardRefTest extends Component {
  fnComponentRef = React.createRef()
  classRef = React.createRef()

  componentDidMount() {
    console.log('fnComponentRef: ', this.fnComponentRef)
    console.log('classRef: ', this.classRef)
  }

  render() {
    return (
      <div>        
        <FnComponentWrapper a="a" b="b" ref={this.fnComponentRef} />
        <ClassComponentWrapper ref={this.classRef} />
      </div>
    )
  }
}

/*
 比如我有个UserQuery组件，用于查询用户信息。
 这个组件自己有个查询表单，提供查询条件。一般的，组件内部用使用state会保存表单查询条件。
 
 现在有个需求，外部希望能够给UserQuery组件提供查询参数来查询数据，外部提供的参数是通过props传入组件内的。
 这样props就与state发生了冲突。
 比如UserQuery组件内部已经用state保存了用户查询条件，同时该组件被缓存了，这时其他地方再给UserQuery提供参数，
 只能覆盖该组件内部保存的state。
 这样就造成了混乱，UserQuery组件的查询条件依赖于state，有依赖于props。

 UserQuery: 只通过props来提供查询条件，该组件只提供查询功能。
 UserList: 引入UserQuery组件，UserList自己保存一份查询数据。

 ChargeLog: viewUser(), 
 
 我觉得我之前的设计逻辑有问题。如果你要在其他页面查看的话，最好还是提供一个模态框，让后显示查询出来的信息，不要再跳转到该组件，除非该组件能够复用。
*/