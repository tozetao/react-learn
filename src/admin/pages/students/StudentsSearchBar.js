import React, { useState } from 'react';
import PropTypes from 'prop-types';

StudentSearchBar.propTypes = {
  defaultValue: PropTypes.shape({
    key: PropTypes.string,
    sex: PropTypes.number
  })
}

export default function StudentSearchBar(props) {
  const defaultValue = {
    key: '',
    sex: -1
  }
  const [query, setQuery] = useState(Object.assign({}, defaultValue, props.defaultValue))

  return (
    <div>
      <input type="text" value={query.key} onChange={event => {
        setQuery({
          ...query,
          key: event.target.value
        })
      }} placeholder="搜索关键字" />

      <div style={{
        display: 'inline-block',
        marginLeft: '10px'
      }}>
        <span>性别：</span>
        <label htmlFor="male">男</label><input name='male' type="checkbox" value={true} />
        <label htmlFor="female">女</label><input name='female' type="checkbox" value={true} />
      </div>
      <button onClick={() => {
        props.onSearch(query)
      }}>搜索</button>
    </div>
  )
}

