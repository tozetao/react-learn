import React, { Component } from 'react'
import RadioGroup from "./index";

export default class test extends Component {
  state = {
    hobbies: [
      { label: '足球', value: 1 },
      { label: '篮球', value: 2 },
      { label: '跳绳', value: 3 },
      { label: '爬山', value: 4 }
    ],
    value: ''
  }

  render() {
    return (
      <div>
        <RadioGroup
          name="hobby"
          data={this.state.hobbies}
          value={this.state.value}
          onChange={(value) => {
            console.log(value)
            this.setState({
              value
            })
          }}
        />
      </div>
    )
  }
}
