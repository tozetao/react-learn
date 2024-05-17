import React, { Component } from 'react'
import CheckBoxGroup from './index'

export default class test extends Component {
  state = {
    hobbies: [
      { label: '足球', value: 1 },
      { label: '篮球', value: 2 },
      { label: '跳绳', value: 3 },
      { label: '爬山', value: 4 }
    ],
    chooseHobbies: []
  }

  render() {
    return (
      <div>
        <CheckBoxGroup
          data={this.state.hobbies}
          name="hobby"
          chooseData={this.state.chooseHobbies}
          onChange={(res) => {
            this.setState({
              chooseHobbies: res
            })
          }}
        />
      </div>
    )
  }
}
