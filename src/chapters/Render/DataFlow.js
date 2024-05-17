import React from 'react'

export default class A extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cnt: 0
    }
    setInterval(() => {
      this.setState({
        cnt: this.state.cnt + 1
      })
    }, 1000)
  }

  render() {
    return (
      <div>
        <B n={this.state.cnt} />
      </div>
    )
  }
}

function B(props) {
  return <div>
    <p>B number: {props.n}</p>
    <C n={props.n} />
  </div>
}

class C extends React.Component {
  render() {
    console.log('C component render')
    return <p>C number: {this.props.n}</p>
  }
}

// function C(props) {
//   console.log('C component, ', props)
//   return <p>C number: {props.n}</p>
// }
