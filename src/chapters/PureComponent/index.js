import React, { Component } from 'react'
import AddTask from './AddTask';
import TaskList from './TaskList';

export default class TaskContainer extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    const tasks = [];
    for (let i = 0; i < 10; i++) {
      tasks.push({name: 'Task' + (i+1), isFinished: Math.random() > 0.7 ? true: false });
    }
    this.setState({
      tasks
    })
  }

  add = (name, status) => {
    // 由于TaskList组件继承自PureComponent，下面的代码会导致其不渲染
    // this.state.tasks.push({ name, isFinished: status })
    // this.setState({
    //   tasks: this.state.tasks
    // })

    this.setState({
      tasks: [...this.state.tasks, { name, isFinished: status }]
    })
  }

  render() {
    console.log('TaskContainer render, ', this.state.tasks)
    return (
      <div>
        <TaskList tasks={this.state.tasks} />
        <AddTask add={this.add} />
      </div>
    )
  }
}

/**
 * PureComponent是一个纯组件。
 * 如果某个组件继承自该组件，则该组件的shouldComponentUpdate()会进行优化，对该组件的props和state会进行浅比较。
 * props和state相等时不会渲染组件，只有在不相等时才渲染组件。
 * 
 * 注：PureComponent是对props和state进行浅比较。
 * 
 * PureComponent是浅比较的，对于继承了PureComponent的组件，在更改该其state时应该使用覆盖的方式去更新state，比如：
 * state = {
 *     tasks: []
 * }
 * // 不推荐
 * this.setState({
 *     tasks: this.state.tasks.push(new_element)
 * })
 * // 建议
 * this.setState({
 *     tasks: [...this.tasks, new_element]
 * })
 */