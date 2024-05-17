import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonTypes from '../../../util/commonTypes'

export default class CheckBoxGroup extends Component {
  // props:
  // chooseData: 选中的数据项
  // data: 提供的数据项
  // name: checkbox的name属性值

  static defaultProps = {
    chooseData: []
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    data: CommonTypes.options.isRequired,
    chooseData: PropTypes.array
  }

  // 按照我以前的思路，这个组件会使用state来保存选中项的值。checkbox的选中状态就根据state保存的值来进行判断。
  // 这种做法的问题在于，当使用CheckBoxGroup组件的外部传递新的props时，组件的state需要与props保持一致，这样部件依赖数据的来源不明确，它既依赖state，又依赖props。
  
  // 好的实现：组件依赖于props，当checkbox的状态改变时，计算出新的选中的数据项并传递给外部组件使用，由外部组件来更改props的值，重新渲染子组件。

  handleChange = event => {
    let chooseData = [...this.props.chooseData]
    
    if (event.target.checked) {
      chooseData.push(event.target.value)
    } else {
      chooseData = chooseData.filter(item => {
        return item.toString() !== event.target.value
      })
    }
    this.props.onChange && this.props.onChange(chooseData, this.props.name, event)
  }

  render() {
    const children = this.props.data.map(item => {
      return (
        <label htmlFor={this.props.name} key={item.value}>
          <input
            type="checkbox"
            name={this.props.name}
            value={item.value}
            checked={this.props.chooseData.includes(item.value)}
            onChange={this.handleChange}
          />
          {item.label}
        </label>
      )
    })

    return (
      <div className='checkbox-group'>
        {children}
      </div>
    )
  }
}
