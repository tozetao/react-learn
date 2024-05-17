import React from 'react'
import './aside.css'

export default function Aside() {
  return (
    <div className='asider'>
      <ul className='asider-menus'>
        <li>
          <a href="/students">Students</a>
        </li>
        <li>
          <a href="/courses">Courses</a>
        </li>
      </ul>
    </div>
  )
}
