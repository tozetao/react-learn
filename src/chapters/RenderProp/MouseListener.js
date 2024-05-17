import React, { Component } from 'react'
import './style.css'


export default class MouseListener extends Component {
  state = {
    x: 0,
    y: 0
  }

  containerRef = React.createRef()

  handleMouseMove = (event) => {
    const boundingClient = this.containerRef.current.getBoundingClientRect()
    this.setState({
      x: parseInt(event.clientX - boundingClient.left),
      y: parseInt(event.clientY - boundingClient.top)
    })
  }

  render() {
    return (
      <div ref={this.containerRef} className='container' onMouseMove={this.handleMouseMove}>
        {this.props.render ? this.props.render(this.state) : ""}
      </div>
    )
  }
}
