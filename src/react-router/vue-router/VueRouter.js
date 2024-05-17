import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import BetterLink from './BetterLink';
import RootRouter from './RootRouter';
import './index.css';

export default function App() {
  return (
    <Router>
      <div>
        <div className='links'>
          <BetterLink to={{ name: 'home' }}>Home</BetterLink>
          <BetterLink to={{ name: 'news' }}>News</BetterLink>
        </div>
        <RootRouter />
      </div>
    </Router>
  )
}
