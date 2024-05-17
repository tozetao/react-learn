import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function animate(start, end, callback) {
  if (start === end) {
    return;
  }

  const totalDuration = 1000
  const duration = 10

  const times = Math.ceil(totalDuration / duration)
  const speed = (end - start) / times

  console.log('end: %o, start: %o, speed: %o', end, start, speed)

  let cnt = 0
  const timer = setInterval(() => {
    cnt += 1
    start += speed

    if (cnt >= times) {
      start = end
      clearInterval(timer)
    }
    callback(start)
  }, duration)
  return timer
}


let timer = null;

// 问题：为什么在快速切换路由时，滚动条会快速的向后再向前
function resetScroll() {
  console.log('clear timer: %o', timer)
  clearInterval(timer)

  const html = document.getElementsByTagName('html')[0]
  timer = animate(html.scrollTop, 0, (change) => {
    html.scrollTop = change
    // console.log('change: %o', change)
  })
}

function Page1(props) {
  console.log(props.location.pathname)
  useScroll(props.location.pathname)

  return (<div style={{
    height: '115vh'
  }}>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <p>Page1</p>
    <button onClick={() => {
    }}>Reset</button>
  </div>)
}

function Page2(props) {
  console.log(props.location.pathname)
  useScroll(props.location.pathname)

  return (<div style={{
    height: '110vh'
  }}>
    Page2
  </div>)
}


// 在路由切换时，会重新喧嚷组件（render、componentDidMount方法都会执行）。
function withScroll(Comp) {
  return class ScrollWrapper extends React.PureComponent {
    componentDidMount() {
      console.log('componentDidMount')
      resetScroll()
    }

    render() {
      return <Comp {...this.props} />
    }
  }
}
const Page1Wrapper = withScroll(Page1)
const Page2Wrapper = withScroll(Page2)

function useScroll(pathname) {
  useEffect(resetScroll, [pathname])
}

export default function Scroll() {
  return (
    <Router>
      <ul style={{
        position: 'fixed',
        top: '50%'
      }}>
        <li><Link to='/page1'>Page1</Link></li>
        <li><Link to='/page2'>Page2</Link></li>
      </ul>
      <div>
        <Route path='/page1' component={Page1} />
        <Route path='/page2' component={Page2} />
        {/* <Route path='/page1' component={Page1Wrapper} />
        <Route path='/page2' component={Page2Wrapper} /> */}
      </div>
    </Router>
  )
}
