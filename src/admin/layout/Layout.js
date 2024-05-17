import React from 'react'
import PropTypes from 'prop-types';
import './layout.css'

Layout.propTypes = {
  header: PropTypes.element,
  aside: PropTypes.element.isRequired,
  children: PropTypes.node
}

export default function Layout(props) {
  return (
    <div className='container'>
      <div className="header">
        { props.header }
      </div>
      <div className="middle">
        {/* aside bar */}
        { props.aside }

        <div className="main">
          { props.children }
        </div>
      </div>
    </div>
  )
}
