import React, { Component } from 'react'


import { BrowserRouter, Route, withRouter, Link } from './index'

class CompA extends Component {
  render() {
    return (<div>
      <h3>Comp A.</h3>
    </div>)
  }
}

function CompB() {
  return (<div>
    <h2>Comp B.</h2>
  </div>)
}

function CompD() {
  return <div>
    <LinksWrapper name='hello!' />
  </div>
}

function Links(props) {
  const { history } = props
  return (<div>
    <button onClick={() => {
      history.push('/comp_a')
    }}>Comp A</button>
    <button onClick={() => {
      history.push('/comp_b')
    }}>Comp B</button>
  </div>)
}


const LinksWrapper = withRouter(Links)

export default function App() {
  return (<BrowserRouter>
    <Route path='/users' component={CompA} />
    <Route path='/news/:id' component={CompB} />
    <div>
      <Link to="/users?name=Lee">comp a</Link>
    </div>
    <div>
      <Link to={{
        pathname: '/news/10'
      }}>comp b</Link>
    </div>
  </BrowserRouter>)
}

// import { BrowserRouter, Route } from 'react-router-dom'

// function CompA() {
//   return (<div>
//     CompA
//   </div>)
// }

// export default function App() {
//   return (<BrowserRouter basename={'/body'}>
//     <Route component={CompA} />
//   </BrowserRouter>)
// }
