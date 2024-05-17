import React, { Component } from 'react'
import ImageContainer from './ImageContainer';
import './index.css';

export default class Carousel extends Component {
  static defaultProps = {
    width: 350,
    height: 150,
    number: 4
  }

  imageContainerRef = element => {
    this.imageContainer = element
  }

  render() {
    return (
      <>
        <div className='carousel' style={{width: this.props.width, height: this.props.height}}>
          <ImageContainer ref={this.imageContainerRef} width={this.props.width} number={this.props.number} />
        </div>
        <button onClick={() => {
          this.imageContainer.next()
        }}>next</button>
        <button onClick={() => {
          this.imageContainer.prev()
        }}>prev</button>
      </>
    )
  }


}