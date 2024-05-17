import React from 'react'

import './header.css'

export default function Header() {
  return (<>
    <div className='header-left'>
      Admin Management
    </div>
    <div>
      <ul className='header-menus'>
        <li>用户账号</li>
        <li className='link'>
          退出
        </li>
      </ul>
    </div>
  </>)
}
