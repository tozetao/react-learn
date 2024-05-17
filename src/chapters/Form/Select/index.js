import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commonTypes from '../../../util/commonTypes'
import withDataGroup from '../../HOC/withDataGroup'

class Option extends Component {
  static propTypes = {
    option: commonTypes.option.isRequired
  }

  render() {
    return <option value={this.props.option.value}>{this.props.option.label}</option>
  }
}

const Options = withDataGroup(Option)

export default class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event.target.value, this.props.name, event)
  }

  render() {
    return (
      <select className='select' name={this.props.name} value={this.props.value}
        onChange={event => {this.props.onChange && this.props.onChange(event.target.value, event)}}>
        <Options {...this.props} />
      </select>
    )
  }
}
