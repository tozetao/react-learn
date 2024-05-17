import React from 'react'
import { BrowserRouter as Router, Redirect, Route, withRouter } from 'react-router-dom/cjs/react-router-dom.min'

function CompA() {
  return (<div>
    Component A.
  </div>)
}

function CompB() {
  return (<div>
    component B.
  </div>)
}

function NotFound() {
  return (<div>
    NotFound
  </div>)
}

function Link(props) {
  return (<a href={ props.to } onClick={event => {
    event.preventDefault()
    event.stopPropagation()
    props.history.push(props.to)
  }}>
    { props.children }
  </a>)
}

const LinkWrapper = withRouter(Link)

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <LinkWrapper to='/a'>Component A</LinkWrapper>
        </div>
        <div>
          <LinkWrapper to='/b'>Component B</LinkWrapper>
        </div>
        <div>
          <LinkWrapper to='/not_found' />
        </div>

        <Route path='/a' component={CompA} />
        <Route path='/b' component={CompB} />
        <Route path='/b' component={NotFound} />
        <Redirect to='/not_found' />
      </Router>
    </div>
  )
}
