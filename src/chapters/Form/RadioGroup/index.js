import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commonTypes from '../../../util/commonTypes'
import withDataGroup from '../../../components/HOC/withDataGroup'

export class RadioGroup extends Component {
  static propTypes = {
    option: commonTypes.option.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event.target.value, this.props.name, event)
  }

  render() {
    return (
      <label htmlFor={this.props.name}>
        <input
          type="radio"
          name={this.props.name}
          value={this.props.option.value}
          checked={this.props.value === this.props.option.value.toString()}
          onChange={this.handleChange}
        />
        {this.props.option.label}
      </label>
    )
  }
}

export default withDataGroup(RadioGroup)