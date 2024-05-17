import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function User(props) {
  console.log(props.match)

  return (
    <div>
      <h3>User Component</h3>
      <div>
        <div><Link to='/user/update'>user update</Link></div>
        <div><Link to='/user/detail'>user detail</Link></div>
      </div>
      <div>
        <Route path='/user/update' component={UserUpdate} />
        <Route path='/user/detail' component={UserDetail} />
      </div>
    </div>
  )
}

function UserUpdate() {
  return (<div>
    It's UserUpdate.
  </div>)
}

function UserDetail() {
  return (<div>
    It's UserDetail.
  </div>)
}

export default function App() {
  return (<>
    <Router>
      <Route path='/user' component={User} />
    </Router>
  </>)
}
