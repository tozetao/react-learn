import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class ImageContainer extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  imageContainerRef = element => {
    this.imageContainer = element
  }

  next = () => {
    let index = this.state.index + 1
    
    const marginLeft = this.getMarginLeft()
    const point = -this.props.number * this.props.width
    console.log(marginLeft, point)
    if (marginLeft === point) {
      this.imageContainer.style.marginLeft = 0
      index = 1
    }

    console.log('next: ', index)
    this.setState({
      index
    }, () => {
      this.switchImage(this.state.index)
    })
  }

  prev = () => {
    let index = this.state.index - 1
    const marginLeft = this.getMarginLeft()
    if (marginLeft === 0) {
      index = this.props.number - 1
      this.imageContainer.style.marginLeft = -this.props.number * this.props.width + 'px'
    }
    console.log(this.getMarginLeft(), index)
    // 0 1 2

    this.setState({
      index
    }, () => {
      this.switchImage(this.state.index)
    })
  }

  switchImage = (index) => {
    const target = -index * this.props.width
    this.move(this.imageContainer, target)
  }

  // 从一个值滑动到另外一个值
  // 0 -300 -600 -900
  move(dom, target) {
    // 计算出变化的量
    const speed = 200
    const duration = 16

    const start = this.getMarginLeft()
    let n = speed * duration / 1000
    const result = target - start
    if (result > 0) {
      n = Math.abs(n);
    } else if (result < 0) {
      n = -n;
    } else {
      return;
    }

    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timer = setInterval(() => {
      let marginLeft = this.getMarginLeft()
      let newLeft = marginLeft + n
      
      if ((n > 0 && newLeft >= target) || (n < 0 && newLeft<= target)) {
        newLeft = target
        clearInterval(this.timer)
      }
      dom.style.marginLeft = newLeft + 'px'
    }, duration)
  }

  getMarginLeft = () => {
    return parseFloat(window.getComputedStyle(this.imageContainer).marginLeft)
  }

  render() {
    const lis = []
    for (let i = 0; i < this.props.number; i++) {
      lis.push(<li key={i} style={{width: this.props.width}}>{i}</li>)
    }
    lis.push(<li key={this.props.number} style={{width: this.props.width}}>0</li>)

    // 拷贝第一个节点

    const width = this.props.width * (this.props.number+1)

    return (
      <ul ref={this.imageContainerRef} className='image-container' style={{width}}>
        {lis}
      </ul>
    )
  }
}
