import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'animate.css'
import './index.css'


import { CSSTransition } from 'react-transition-group';

function Page1() {
  return (<div style={{
    backgroundColor: 'red'
  }}>
    <h3>Page1</h3>
  </div>)
}

function Page2() {
  return (<div style={{
    backgroundColor: 'yellow'
  }}>
    <h3>Page2</h3>
  </div>)
}

function Page3() {
  return (<div>
    <h3>Page3</h3>
  </div>)
}

function RouteAnimation(props) {
  const { component: Component, ...rest } = props
  return (<Route {...rest}>
    {context => {
      const inProp = !!context.match
      return (
        <CSSTransition
          classNames={{
            enterActive: 'animate__animated animate__fadeIn animate__fast',
            exitActive: 'animate__animated animate__fadeOut animate__fast'
          }}
          in={inProp}
          timeout={800}
          mountOnEnter
          unmountOnExit
        >
          <div className='main-page'>
            { <Component /> }
          </div>
        </CSSTransition>
      )
    }}
  </Route>)
}

export default function App() {
  return (
    <Router>
      <div className='container'>
        <ul className='links'>
          <li>
            <Link to='/page1'>Page 1</Link>
          </li>
          <li><Link to='/page2'>Page 2</Link></li>
          <li><Link to='/page3'>Page 3</Link></li>
        </ul>
        <div className='main'>
          <RouteAnimation path='/page1' exact component={Page1} />
          <RouteAnimation path='/page2' exact component={Page2} />
          <RouteAnimation path='/page3' exact component={Page3} />
        </div>
      </div>
    </Router>
  )
}
