import React from 'react'

const Banner = props => {
  const { message } = props
  return (
    <div className="banner-container">
      { message !== '' && <h1 className="banner">{message}</h1> }
    </div>
  )
}

export default Banner