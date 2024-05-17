import React from 'react'

// import { Link } from 'react-router-dom';
import BetterLink from './BetterLink';

export default function News(props) {
  console.log(props.children)
  return (
    <div>
      <h3>News</h3>
      <div className='links'>
        <BetterLink to={{ name: 'news_detail' }}>BetterLink</BetterLink>
      </div>
      {/* News组件下的子组件 */}
      <div>
        {props.children}
      </div>
    </div>
  )
}
