import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withDataGroup from '../../HOC/withDataGroup'
import commonTypes from '../../../util/commonTypes'



export class CheckBox extends Component {
  static defaultProps = {
    chooseData: []
  }

  static propTypes = {
    name: PropTypes.string,
    option: commonTypes.option.isRequired,
    chooseData: PropTypes.array,
    onChange: PropTypes.func
  }

  onChange(checked) {
    let chooseData = [...this.props.chooseData]
    
    if (checked) {
      chooseData.push(this.props.option.value)
    } else {
      chooseData = chooseData.filter(item => {
        return item !== this.props.option.value
      })
    }
    this.props.onChange && this.props.onChange(chooseData, this.props.name)
  }

  handleChange = event => {
    this.onChange(event.target.checked)
  }

  handleLabelClick = event => {
    if ('LABEL' === event.target.tagName) {
      const checked = !this.props.chooseData.includes(this.props.option.value)
      this.onChange(checked)
    }
  }

  render() {
    return (
      <label htmlFor={this.props.name} key={this.props.option.value} onClick={this.handleLabelClick}>
        <input
          type="checkbox"
          name={this.props.name}
          value={this.props.option.value}
          checked={this.props.chooseData.includes(this.props.option.value)}
          onChange={this.handleChange}
        />
        {this.props.option.label}
      </label>
    )
  }

}

export default withDataGroup(CheckBox)