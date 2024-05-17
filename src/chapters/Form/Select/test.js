import React, { Component } from 'react'
import Select from "./index";

export default class test extends Component {
  state = {
    hobbies: [
      { label: '足球', value: 1 },
      { label: '篮球', value: 2 },
      { label: '跳绳', value: 3 },
      { label: '爬山', value: 4 }
    ],
    value: null
  }

  render() {
    return (
      <div>
        <Select
          name="hobby"
          data={this.state.hobbies}
          value={this.state.value}
          onChange={(value) => {
            this.setState({
              value
            })
          }}
        />
        <button onClick={
          () => {
            this.state.hobbies.push({ label: (new Date()).getDate(), value: 100 })
            this.setState({
              hobbies: this.state.hobbies
            })
          }
        }>Click</button>
      </div>
    )
  }
}
