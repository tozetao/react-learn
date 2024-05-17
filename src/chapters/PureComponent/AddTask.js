// import React, { useState } from 'react'
// import PropTypes from 'prop-types'

// export function AddTask(props) {
//   console.log('AddTask render')

//   const [value, setValue] = useState('')
//   return (
//     <div>
//       <input value={value} onChange={ e => setValue(e.target.value) } />
//       <button onClick={props.addTask && props.AddTask(value, true)}>Add Task</button>
//     </div>
//   )
// }

// AddTask.propTypes = {
//   addTask: PropTypes.func
// }

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import { objectEqual } from './helper'

export default class AddTask extends PureComponent {
  state = {
    value: ''
  }

  static propTypes = {
    add: PropTypes.func
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !(objectEqual(this.props, nextProps) && objectEqual(this.state, nextState))
  // }

  render() {
    console.log('AddTask render')
    return (
      <div>        
        <input value={this.state.value} onChange={ e => {
          this.setState({
            value: e.target.value
          })
        } } />
        <button onClick={() => {
          this.props.add && this.props.add(this.state.value, true)
        }}>Add Task</button>
      </div>
    )
  }
}
