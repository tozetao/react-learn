import React, { PureComponent } from 'react'

export default function withMouseListener(Comp) {
  return class MouseListener extends PureComponent {
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
          <Comp {...this.props} x={this.state.x} y={this.state.y} />
        </div>
      )
    }
  }
}