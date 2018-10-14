import React from 'react'

const Loader = ({ title }) => {
  return (
    <div>
      <h2>Waiting for others to accept the film</h2>
      <h3>{title}</h3>
    </div>
  )
}

export default Loader