import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

function Task(props) {
  console.log('Task render')
  return (
    <ul>
      <li className={props.isFinished ? 'finished' : 'init'}>{props.name}</li>
    </ul>
  )
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  isFinished: PropTypes.bool.isRequired
}

// memo返回一个高阶组件，其实就是使用class对函数进行了封装。
export default React.memo(Task)

// export default class Task extends Component {
//   static propTypes = {
//     name: PropTypes.string.isRequired,
//     isFinished: PropTypes.bool.isRequired
//   }

//   render() {
//     console.log('Task render')

//     return (
//       <ul>
//         <li className={this.props.isFinished ? 'finished' : 'init'}>{this.props.name}</li>
//       </ul>
//     )
//   }
// }
