import React, { Component } from 'react'
// import OldLifeCycle from './OldLifeCycle'
import NewLifeCycle from "./NewLifeCycle";

export default class LifeCycleExample extends Component {
  state = {
    cnt: 1
  }

  render() {
    return (
      <div>
        <NewLifeCycle cnt={this.state.cnt} />
        <p>
          <button onClick={() => {
            this.setState({
              cnt: this.state.cnt + 1
            })
          }}>改变属性值</button>
        </p>
      </div>
    )
  }
}
