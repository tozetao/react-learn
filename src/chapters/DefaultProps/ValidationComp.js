import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ValidationComp extends Component {
  // 属性默认值混合
  static defaultProps = {
    cnt: 100
  }

  // 属性验证
  static propTypes = {
    cnt: PropTypes.number.isRequired,
    info: PropTypes.node.isRequired
  }

  render() {
    return (
      <div>
        <p>{this.props.cnt}</p>
        <p>{this.props.info}</p>
      </div>
    )
  }
}
