import React from 'react'

export default function StudentDetail(props) {
  const match = props.match
  return (
    <div>
      <h3>Student Detail</h3>
      <p>ID: {match.params.id}</p>
    </div>
  )
}
