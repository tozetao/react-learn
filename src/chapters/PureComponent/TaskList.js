import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

export default class TaskList extends PureComponent {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      isFinished: PropTypes.bool.isRequired
    }))
  }

  render() {
    console.log('TaskList render')
    
    const tasks = this.props.tasks.map((item, index) => {
      return (
        <Task key={index} {...item} />
      )
    })
    return (
      <div>
        {tasks}
      </div>
    )
  }
}
